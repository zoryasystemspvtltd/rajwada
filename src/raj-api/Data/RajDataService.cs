﻿using ILab.Extensionss.Data;
using ILab.Extensionss.Data.Models;
using Newtonsoft.Json;
using RajApi.Data;
using RajApi.Data.Models;

namespace ILab.Data
{
    public class RajDataService : ILabDataService
    {

        public readonly RajDataHandler dataHandler;
        public RajDataService(RajDataHandler handler
            , ILogger<RajDataService> logger)
            : base(handler, logger)
        {
            dataHandler = handler;
        }

        /// <summary>
        /// 
        /// </summary>
        public virtual ModuleIdentity Identity { get { return dataHandler.Identity; } set { dataHandler.Identity = value; } }
        public async Task<dynamic> GetUploadedfile(string module, long id)
        {
            var data = await Get(module, id);
            return data;

        }
        public override Type? GetType(string model)
        {
            var asm = typeof(RajDataService).Assembly;

            var type = asm.GetTypes()
                .FirstOrDefault(p => p.Name.Equals(model, StringComparison.OrdinalIgnoreCase)
                    && p.IsSubclassOf(typeof(LabModel)));

            if (type == null) { return null; }

            return type;
        }

        public override async Task<long> EditPartialAsync(string model, long id, dynamic data, CancellationToken token)
        {
            try
            {
                var type = GetType(model);
                if (type == null) { return -1; }

                var jsonString = data.ToString();
                var jsonData = JsonConvert.DeserializeObject(jsonString, type);

                var existingData = await Get(model, id);
                existingData.Member = jsonData.Member;
                existingData.Status = StatusType.Assigned;
                if (type == typeof(LevelSetup))
                {
                    if (jsonData != null && jsonData?.Status != null)
                    {
                        existingData.Status = jsonData?.Status;
                    }

                    if (jsonData != null && jsonData?.IsApproved != null)
                    {
                        existingData.ApprovedBy = jsonData?.ApprovedBy;
                        existingData.ApprovedDate = jsonData?.ApprovedDate;
                        existingData.IsApproved = jsonData?.IsApproved;
                        existingData.ApprovedRemarks = jsonData?.ApprovedRemarks;
                    }
                }
                

                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.EditPartialAsync));
                var generic = method?.MakeGenericMethod(type);
                object[] parameters = { existingData, token };
                var task = (Task<long>)generic.Invoke(handler, parameters);

                var result = await task;

                return result;
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in AssignAsync method and details: " + ex.Message);
                return 0;
            }
        }

        public virtual async Task<long> SaveDataAsync(string model, dynamic data, CancellationToken token)
        {
            try
            {
                var type = GetType(model);
                if (type == null) { return -1; }

                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.AddAsync));
                var generic = method?.MakeGenericMethod(type);
                object[] parameters = { data, token };
                var task = (Task<long>)generic.Invoke(handler, parameters);

                var result = await task;

                return result;
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in AssignAsync method and details: " + ex.Message);
                return 0;
            }
        }

        public virtual dynamic GetDetails(long planId, CancellationToken token)
        {
            try
            {                
                var method = typeof(RajDataHandler).GetMethod(nameof(RajDataHandler.GetResourceDetails));               
                object[] parameters = [planId];
                return method?.Invoke(handler, parameters);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception in AssignAsync method and details: " + ex.Message);
                return 0;
            }
        }
    }
}
