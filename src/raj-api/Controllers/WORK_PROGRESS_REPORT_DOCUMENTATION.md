# Work Progress Report API Documentation

## Overview

The **Work Progress Report API** provides comprehensive work tracking and progress reporting across the organizational hierarchy (Company → Project → Tower/Block). It exposes detailed activity progress data including all required fields for construction project management.

## Endpoints

### 1. **POST /api/work-progress-report/detail**
Get detailed work progress report with all fields

**Description:** Returns a flat list of all work activities with complete details including company, project, location hierarchy, personnel, costs, and progress.

**Request:**
```json
{
  "companyId": null,
  "projectId": null,
  "towerId": null,
  "floorId": null,
  "flatId": null,
  "roomId": null,
  "insideOutside": null,
  "fromDate": null,
  "toDate": null
}
```

**Response:**
```json
{
  "success": true,
  "totalRecords": 150,
  "data": [
    {
      "activityId": 26,
      "companyName": "Zorya Systems",
      "companyId": 1,
      "projectName": "Royal Gardens",
      "projectId": 3,
      "insideOutside": "INSIDE",
      "towerName": "BLOCK 3",
      "towerId": 69,
      "floor": "Floor 1",
      "floorId": 71,
      "flat": "1-3BHK-B",
      "flatId": 74,
      "room": "Bath-1",
      "roomId": 196,
      "developer": "qc.engineer@zorya.co.in",
      "contractor": "ABC Contractors",
      "activities": "Cemant WorkSunday1",
      "date": "2026-05-03T00:55:54",
      "cost": 500000,
      "engineer": "qc.engineer@zorya.co.in",
      "percentageOfWork": 100,
      "status": "Closed",
      "isApproved": true
    }
  ]
}
```

---

### 2. **POST /api/work-progress-report/grouped**
Get grouped work progress report with hierarchy

**Description:** Returns activities organized by Company → Project → Tower hierarchy with aggregated statistics at each level.

**Request:**
```json
{
  "companyId": 1,
  "projectId": null,
  "towerId": null
}
```

**Response:**
```json
{
  "success": true,
  "totalGroups": 2,
  "data": [
    {
      "companyName": "Zorya Systems",
      "companyId": 1,
      "projects": [
        {
          "projectName": "Royal Gardens",
          "projectId": 3,
          "totalActivities": 150,
          "totalEstimatedCost": 15000000,
          "totalActualCost": 14500000,
          "towers": [
            {
              "towerName": "BLOCK 3",
              "towerId": 69,
              "insideOutside": "INSIDE",
              "totalActivities": 50,
              "totalEstimatedCost": 5000000,
              "totalActualCost": 4800000,
              "activities": [...]
            }
          ]
        }
      ]
    }
  ]
}
```

---

### 3. **POST /api/work-progress-report/summary**
Get work progress summary statistics

**Description:** Returns high-level statistics and metrics about work progress, including completion rates, cost summaries, and distribution by status.

**Request:**
```json
{
  "companyId": null,
  "projectId": 3,
  "towerId": null
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalActivities": 150,
    "totalEstimatedCost": 15000000,
    "totalActualCost": 14500000,
    "averageProgressPercentage": 75,
    "completedActivities": 120,
    "inProgressActivities": 25,
    "pendingActivities": 5,
    "approvedActivities": 118,
    "byInsideOutside": [
      {
        "type": "INSIDE",
        "count": 100
      },
      {
        "type": "OUTSIDE",
        "count": 50
      }
    ],
    "byStatus": [
      {
        "type": "Closed",
        "count": 120
      },
      {
        "type": "InProgress",
        "count": 25
      },
      {
        "type": "Pending",
        "count": 5
      }
    ]
  }
}
```

---

## Request Filter Parameters

### WorkProgressReportRequest

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| companyId | long? | No | Filter by specific company |
| projectId | long? | No | Filter by specific project |
| towerId | long? | No | Filter by specific tower/block |
| floorId | long? | No | Filter by specific floor |
| flatId | long? | No | Filter by specific flat |
| roomId | long? | No | Filter by specific room |
| insideOutside | string? | No | Filter by "inside" or "outside" type |
| fromDate | DateTime? | No | Filter from start date |
| toDate | DateTime? | No | Filter to end date |

**All parameters are optional. Leave null/empty to retrieve all data matching other filters.**

---

## Response Fields (WorkProgressReportDto)

| Field | Type | Description |
|-------|------|-------------|
| ActivityId | long | Unique activity identifier |
| CompanyName | string | Company/Organization name |
| CompanyId | long? | Company reference ID |
| ProjectName | string | Project name |
| ProjectId | long? | Project reference ID |
| InsideOutside | string | Activity type: "INSIDE" or "OUTSIDE" |
| TowerName | string | Tower/Block name |
| TowerId | long? | Tower reference ID |
| Floor | string | Floor identifier/name |
| FloorId | long? | Floor reference ID |
| Flat | string | Flat identifier/name |
| FlatId | long? | Flat reference ID |
| Room | string | Room name/identifier |
| RoomId | long? | Room reference ID |
| Developer | string | Developer/Project manager |
| Contractor | string | Contractor name |
| Activities | string | Activity name/description |
| Date | DateTime? | Activity creation/start date |
| Cost | decimal? | Estimated cost |
| Engineer | string | Engineer/QC personnel |
| PercentageOfWork | int | Completion percentage (0-100) |
| Status | string | Current status |
| IsApproved | bool | Approval status (QC/HOD) |

---

## Data Sources

The API retrieves data from these models:

### Activity
- Activity name, description, dates
- Cost estimates and actuals
- Progress percentage
- Type (Inside/Outside)
- Status and approval flags
- Foreign keys to related entities

### ActivityTracking
- Cost tracking
- Progress percentage updates
- Man power allocation

### Plan
- Tower, Floor, Flat, Room information
- Hierarchical structure

### Project
- Project name
- Company reference

### Company
- Company name and details

---

## Filter Examples

### Example 1: Get all activities for specific company
```bash
POST /api/work-progress-report/detail
{
  "companyId": 1
}
```

### Example 2: Get activities for specific project and tower
```bash
POST /api/work-progress-report/detail
{
  "projectId": 3,
  "towerId": 69
}
```

### Example 3: Get activities within date range
```bash
POST /api/work-progress-report/detail
{
  "projectId": 3,
  "fromDate": "2026-01-01T00:00:00",
  "toDate": "2026-12-31T23:59:59"
}
```

### Example 4: Get grouped report by company
```bash
POST /api/work-progress-report/grouped
{
  "companyId": 1
}
```

### Example 5: Get summary statistics for project
```bash
POST /api/work-progress-report/summary
{
  "projectId": 3
}
```

### Example 6: Get inside activities only
```bash
POST /api/work-progress-report/detail
{
  "projectId": 3,
  "insideOutside": "inside"
}
```

---

## Authorization

All endpoints require:

- **Authentication**: Bearer JWT token
- **Authorization Header**: `Authorization: Bearer <your_jwt_token>`
- **Privilege**: User must have "view" privilege
- **Claims Required**:
  - `activity-member` - User's email/identifier
  - `activity-key` - User's unique key

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Data retrieved |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient privileges |
| 500 | Internal Server Error |

---

## Error Response

```json
{
  "success": false,
  "message": "Exception in GetWorkProgressReportDetail: 'Error message details'"
}
```

---

## Integration Examples

### JavaScript/Fetch
```javascript
const request = {
  projectId: 3,
  towerId: 69
};

const response = await fetch('/api/work-progress-report/detail', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(request)
});

const result = await response.json();
console.log(result.data);
```

### cURL
```bash
curl -X POST http://localhost:5000/api/work-progress-report/summary \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"projectId":3}'
```

### PowerShell
```powershell
$token = "YOUR_JWT_TOKEN"
$body = @{ projectId = 3 } | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/work-progress-report/grouped" `
  -Method POST `
  -Headers @{ "Authorization" = "Bearer $token" } `
  -ContentType "application/json" `
  -Body $body
```

---

## Use Cases

### 1. Project Dashboard
Get summary statistics for project overview:
```
POST /api/work-progress-report/summary
{ "projectId": 3 }
```

### 2. Block-wise Performance
Get grouped report to see performance by block:
```
POST /api/work-progress-report/grouped
{ "projectId": 3 }
```

### 3. Detailed Work Tracking
Get all activity details for analysis:
```
POST /api/work-progress-report/detail
{ "projectId": 3, "towerId": 69 }
```

### 4. Cost Analysis
Get all activities with cost details:
```
POST /api/work-progress-report/detail
{ "projectId": 3 }
// Analyze Cost and ActualCost fields
```

### 5. Completion Tracking
Get summary to check completion rates:
```
POST /api/work-progress-report/summary
{ "projectId": 3 }
// Check: completedActivities, inProgressActivities, averageProgressPercentage
```

---

## Performance Notes

- **Large Datasets**: Filter by ProjectId or TowerId for better performance
- **Date Range Filtering**: Use FromDate/ToDate for historical analysis
- **Grouped Reports**: Shows hierarchical structure but may be larger payload
- **Summary Endpoint**: Fastest option for high-level metrics

---

## Related Endpoints

- `GET /api/{module}` - General CRUD operations
- `POST /api/reports/*` - Other status reports
- `POST /api/work/status-check` - Real-time status

---

## Version History

### v1.0
- Initial release
- 3 endpoints (detail, grouped, summary)
- Full field exposure
- Company, Project, Tower filtering
- Date range filtering
