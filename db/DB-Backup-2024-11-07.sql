USE [Rajwada]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Activities]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Activities](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[Type] [nvarchar](max) NOT NULL,
	[DocumentLinks] [nvarchar](max) NULL,
	[Notes] [nvarchar](max) NULL,
	[PriorityStatus] [int] NULL,
	[WorkflowState] [int] NULL,
	[ApprovalStatus] [int] NULL,
	[CostEstimate] [decimal](18, 2) NOT NULL,
	[ActualCost] [decimal](18, 2) NOT NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
	[ActualStartDate] [datetime2](7) NULL,
	[ActualEndDate] [datetime2](7) NULL,
	[Duration] [int] NOT NULL,
	[ProgressPercentage] [int] NOT NULL,
	[ProjectId] [bigint] NULL,
	[ParentId] [bigint] NULL,
	[ParentName] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_Activities] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActivityDependencies]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActivityDependencies](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FromActivityId] [bigint] NULL,
	[ToActivityId] [bigint] NULL,
	[DependencyType] [nvarchar](max) NULL,
	[LagTime] [decimal](18, 2) NOT NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_ActivityDependencies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ActivityResources]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ActivityResources](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ResourceType] [nvarchar](max) NULL,
	[UnitCost] [decimal](18, 2) NULL,
	[Quantity] [decimal](18, 2) NULL,
	[TotalCost] [decimal](18, 2) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_ActivityResources] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ApplicationLogs]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ApplicationLogs](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[EntityId] [bigint] NOT NULL,
	[ActivityType] [int] NOT NULL,
	[ContentHistory] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_ApplicationLogs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [bigint] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[Member] [nvarchar](max) NULL,
	[Key] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [bigint] NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [bigint] NOT NULL,
	[RoleId] [bigint] NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NULL,
	[LastName] [nvarchar](max) NULL,
	[Disable] [bit] NOT NULL,
	[PhotoUrl] [nvarchar](max) NULL,
	[Department] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[AccessFailedCount] [int] NOT NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[ParentId] [bigint] NULL,
	[Member] [nvarchar](max) NULL,
	[Key] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [bigint] NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetGroups]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetGroups](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_AssetGroups] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Assets]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Assets](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[UomId] [bigint] NULL,
	[TypeId] [bigint] NOT NULL,
	[GroupId] [bigint] NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[GroupName] [nvarchar](max) NULL,
	[TypeName] [nvarchar](max) NULL,
	[UomName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Assets] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetTypes]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetTypes](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_AssetTypes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Companys]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Companys](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[Type] [nvarchar](max) NOT NULL,
	[Zone] [nvarchar](max) NULL,
	[Address1] [nvarchar](max) NULL,
	[Address2] [nvarchar](max) NULL,
	[Address3] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[State] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[PinCode] [int] NULL,
	[Latitude] [int] NULL,
	[Longitude] [int] NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Email] [nvarchar](max) NULL,
	[Website] [nvarchar](max) NULL,
	[ContactName] [nvarchar](max) NULL,
	[Logo] [nvarchar](max) NULL,
	[QrCode] [nvarchar](max) NULL,
	[Currency] [nvarchar](max) NULL,
	[GSTNo] [nvarchar](max) NULL,
	[PanNo] [nvarchar](max) NULL,
	[TinNo] [nvarchar](max) NULL,
	[ParentId] [bigint] NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[ParentName] [nvarchar](max) NULL,
	[BelongTo] [nvarchar](max) NULL,
 CONSTRAINT [PK_Companys] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departments](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](10) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_Departments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plans]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Plans](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Status] [int] NULL,
	[State] [int] NULL,
	[ApprovalStatus] [int] NULL,
	[BudgetAmount] [decimal](18, 2) NOT NULL,
	[Cost] [decimal](18, 2) NOT NULL,
	[TotalCost] [decimal](18, 2) NOT NULL,
	[PlanStartDate] [datetime2](7) NULL,
	[PlanEndDate] [datetime2](7) NULL,
	[CompletionCertificateDate] [datetime2](7) NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
	[ProjectId] [bigint] NULL,
	[ParentId] [bigint] NULL,
	[Name] [nvarchar](511) NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[BudgetAllocationAmount] [decimal](18, 2) NOT NULL,
	[ParentName] [nvarchar](max) NULL,
	[Type] [nvarchar](max) NULL,
 CONSTRAINT [PK_Plans] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Privileges]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Privileges](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Module] [nvarchar](50) NULL,
	[RoleId] [bigint] NULL,
	[Member] [nvarchar](max) NULL,
	[Key] [nvarchar](max) NULL,
 CONSTRAINT [PK_Privileges] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[StartFinYear] [nvarchar](max) NULL,
	[BelongTo] [nvarchar](max) NULL,
	[Zone] [nvarchar](max) NULL,
	[Address1] [nvarchar](max) NULL,
	[Address2] [nvarchar](max) NULL,
	[Address3] [nvarchar](max) NULL,
	[Country] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[PinCode] [int] NULL,
	[Latitude] [int] NULL,
	[Longitude] [int] NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[ContactName] [nvarchar](max) NULL,
	[Status] [int] NULL,
	[State] [nvarchar](max) NULL,
	[ApprovalStatus] [int] NULL,
	[BudgetAmount] [decimal](18, 2) NOT NULL,
	[TotalCost] [decimal](18, 2) NOT NULL,
	[PlanStartDate] [datetime2](7) NULL,
	[PlanEndDate] [datetime2](7) NULL,
	[CompletionCertificateDate] [datetime2](7) NULL,
	[ParentId] [bigint] NULL,
	[CompanyId] [bigint] NULL,
	[Name] [nvarchar](511) NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[BudgetAllocationAmount] [decimal](18, 2) NOT NULL,
	[CompanyName] [nvarchar](max) NULL,
	[WorkflowState] [int] NULL,
	[ParentName] [nvarchar](max) NULL,
 CONSTRAINT [PK_Projects] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Uoms]    Script Date: 11/7/2024 5:36:16 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Uoms](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_Uoms] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240912230306_Initials', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914133928_Initials', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914151424_def', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914183139_df', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914185219_nm', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914190921_ch', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914201404_pl', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914202531_ty', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240914203320_typ', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240919091158_state', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240919092612_cmp', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921184547_t', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921190147_t1', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921190243_t2', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921200139_t3', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921201822_t4', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921203351_t5', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240921214636_t6', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240927121819_activity', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240929085041_remove', N'8.0.8')
GO
SET IDENTITY_INSERT [dbo].[ApplicationLogs] ON 
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (1, 1, 0, NULL, N'Company', 0, CAST(N'2024-09-29T08:50:37.5432606' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (2, 1, 0, NULL, N'Department', 0, CAST(N'2024-09-29T08:50:37.5432612' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (3, 2, 0, NULL, N'Department', 0, CAST(N'2024-09-29T08:50:37.5432617' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (4, 5, 0, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":0,"State":null,"ApprovalStatus":null,"BudgetAmount":null,"BudgetAllocationAmount":null,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-14T15:15:34.4767566Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-14T15:15:50.7216670' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (5, 1, 0, N'{"Code":"CAM","Assets":null,"Id":1,"Name":"Camera","Status":0,"Date":"2024-09-14T17:31:53.7275151Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'AssetGroup', NULL, CAST(N'2024-09-14T17:31:53.9420060' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (6, 1, 0, N'{"Code":"UNIT","Id":1,"Name":"Unit","Status":0,"Date":"2024-09-14T17:54:21.10058Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Uom', NULL, CAST(N'2024-09-14T17:54:21.1330128' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (7, 1, 0, N'{"Code":"DEMO","UomId":1,"Uom":null,"TypeId":1,"Type":null,"GroupId":1,"Group":null,"Id":1,"Name":"DEMO","Status":0,"Date":"2024-09-14T17:54:45.0939513Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Asset', NULL, CAST(N'2024-09-14T17:54:45.1494091' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (8, 1, 0, N'{"Code":null,"Description":"Tower A","Status":0,"State":null,"ApprovalStatus":null,"BudgetAmount":null,"BudgetAllocationAmount":null,"Cost":null,"TotalCost":null,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":5,"Project":null,"ParentId":null,"Parent":null,"Plans":null,"Id":1,"Name":"Tower A","Date":"2024-09-14T18:15:48.0849978Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T18:15:48.1860982' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (9, 2, 0, N'{"Code":null,"Description":"1st Floor","Status":0,"State":null,"ApprovalStatus":null,"BudgetAmount":null,"BudgetAllocationAmount":null,"Cost":null,"TotalCost":null,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":1,"Parent":null,"Plans":null,"Id":2,"Name":"Flore 1","Date":"2024-09-14T18:28:23.1304709Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T18:28:23.1415674' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (10, 3, 0, N'{"Code":null,"Description":"1st Floor A","Status":0,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":2,"Parent":null,"Plans":null,"Id":3,"Name":"1A","Date":"2024-09-14T18:38:14.2538494Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T18:38:14.4743529' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (11, 3, 1, N'{"Code":null,"Description":"1st Floor A","Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ProjectName":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":null,"Id":3,"Name":"1A","Date":"2024-09-14T19:40:42.9319204Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T19:40:43.1389728' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (12, 4, 0, N'{"Code":null,"Description":"Flat b","Status":0,"State":null,"ApprovalStatus":null,"Type":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":null,"Id":4,"Name":"Flat B","Date":"2024-09-14T21:04:47.6805565Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:04:47.9398644' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (13, 5, 0, N'{"Code":null,"Description":"floor c","Status":0,"State":null,"ApprovalStatus":null,"Type":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":null,"Id":5,"Name":"Flat C","Date":"2024-09-14T21:06:16.4293185Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:06:16.5287534' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (14, 6, 0, N'{"Code":null,"Description":"Flat d","Status":0,"State":null,"ApprovalStatus":null,"Type":"flat","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":null,"Id":6,"Name":"Flat D","Date":"2024-09-14T21:25:48.0968069Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:25:48.1056779' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (15, 7, 0, N'{"Code":null,"Description":"flat e","Status":0,"State":null,"ApprovalStatus":null,"Type":"flat","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":null,"Id":7,"Name":"Flat E","Date":"2024-09-14T21:29:42.0979335Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:29:42.1076173' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (16, 7, 1, N'{"Code":null,"Description":"1E","Status":1,"State":null,"ApprovalStatus":null,"Type":"flat","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":null,"Id":7,"Name":"Flat E","Date":"2024-09-14T21:30:47.9307347Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:30:47.9453563' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (17, 1, 1, N'{"Code":null,"Description":"Tower A","Status":1,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":5,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":null,"Id":1,"Name":"Tower A","Date":"2024-09-14T21:32:51.8773938Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:32:51.8877740' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (18, 8, 0, N'{"Code":null,"Description":"Tower B","Status":0,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":null,"Id":8,"Name":"Tower B","Date":"2024-09-14T21:33:12.6589893Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:33:12.6723389' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (19, 2, 1, N'{"Code":null,"Description":"1st Floor","Status":1,"State":null,"ApprovalStatus":null,"Type":"floor","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":1,"Parent":null,"ParentName":null,"Plans":null,"Id":2,"Name":"Flore 1","Date":"2024-09-14T21:33:29.4809564Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:33:29.4909058' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (20, 9, 0, N'{"Code":null,"Description":"Floor 2","Status":0,"State":null,"ApprovalStatus":null,"Type":"floor","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"ProjectId":null,"Project":null,"ParentId":1,"Parent":null,"ParentName":null,"Plans":null,"Id":9,"Name":"Floor 2","Date":"2024-09-14T21:34:07.3735153Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-09-14T21:34:07.3816438' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (21, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-19T06:35:06.2656466Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-19T06:35:06.4025242' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (22, 2, 0, N'{"Code":"comp1","Type":"Company","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"Email":null,"Website":null,"ContactName":null,"Logo":null,"QrCode":null,"Currency":null,"GSTNo":null,"PanNo":null,"TinNo":null,"ParentId":null,"Parent":null,"ParentName":null,"Projects":null,"Id":2,"Name":"Company 1","Status":0,"Date":"2024-09-19T06:36:07.0623345Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Company', NULL, CAST(N'2024-09-19T06:36:07.0893889' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (23, 2, 1, N'{"Code":"CP","Type":"Company","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"Email":null,"Website":null,"ContactName":null,"Logo":null,"QrCode":null,"Currency":null,"GSTNo":null,"PanNo":null,"TinNo":null,"ParentId":null,"Parent":null,"ParentName":null,"Projects":null,"Id":2,"Name":"Company 1","Status":1,"Date":"2024-09-19T06:36:34.0468691Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Company', NULL, CAST(N'2024-09-19T06:36:34.0528939' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (24, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-19T06:36:48.0631775Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-19T06:36:48.0661254' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (25, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-22T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-19T06:37:28.1250509Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-19T06:37:28.1293836' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (26, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-22T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-19T06:39:08.8102073Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-19T06:39:08.8149011' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (27, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-22T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-19T06:42:45.1179465Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-19T06:42:45.1211494' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (28, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-22T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-21T05:48:26.7016034Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-21T05:48:26.8178643' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (29, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":null,"Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-22T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-21T05:49:17.6081379Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-21T05:49:17.6121666' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (30, 5, 1, N'{"Code":"DEMO","StartFinYear":"2024","BelongTo":"2","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-22T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":5,"Name":"DEMO","Date":"2024-09-21T05:54:24.6362243Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-21T05:54:24.6394280' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (31, 6, 0, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":0,"State":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":6,"Name":"Project 1","Date":"2024-09-21T06:12:54.3968762Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-21T06:12:54.4076162' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (32, 8, 1, N'{"Code":null,"Description":"Tower B","Status":1,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":"2024-10-07T00:00:00","PlanEndDate":"2024-10-10T00:00:00","CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":null,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":null,"Id":8,"Name":"Tower B","Date":"2024-10-09T13:00:43.7800701Z","Member":"admin@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-09T13:00:43.8852201' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[ApplicationLogs] OFF
GO
SET IDENTITY_INSERT [dbo].[AspNetRoles] ON 
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp], [Member], [Key]) VALUES (1, N'root', N'ROOT', N'1fbd204a-762b-4149-9a54-44ae6354d79c', N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp], [Member], [Key]) VALUES (2, N'Super Admin', N'SUPER', N'26E9A03B-E6BB-4567-A36B-E1DE6B6C1227', N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp], [Member], [Key]) VALUES (3, N'Admin', N'ADMIN', N'd3dff883-d8ba-4f25-8529-29ef5f5343ce', N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp], [Member], [Key]) VALUES (4, N'User', N'USER', N'c78c489a-fb53-4a42-aee6-60818a3be800', N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AspNetRoles] OFF
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (1, 1)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (2, 2)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (3, 3)
GO
SET IDENTITY_INSERT [dbo].[AspNetUsers] ON 
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (1, N'Root', N'', 0, NULL, NULL, NULL, N'AQAAAAIAAYagAAAAEIUXHqy53Dre8nfwKZJ/mfDjLdtvMcpPO0pC7M4VwCb+K+eta6c8nxYOp21EfUbGzg==', N'root', N'ROOT', N'R7JOVNY6TU5ACLDKWMJCCXJZIHNATIIJ', 1, N'a7e26408-644a-48ca-a0a7-7cb94e41315d', 0, 0, 0, NULL, 0, N'0000', N'root', N'ROOT', NULL, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (2, N'Super', N'Admin', 0, NULL, NULL, NULL, N'AQAAAAIAAYagAAAAELqk4UGflJwt6TXes3xWFJAx0efgllp581Iy5QqjSGAJ08RIg0Fa2wEpjOiUF1Xr6g==', N'super@rajwada.com', N'SUPER@RAJWADA.COM', N'HKYSS737MAJ3NTMRGGF4PTRUFJJQMKW7', 1, N'beb51693-c540-4441-892c-966b32d3e431', 0, 0, 0, NULL, 0, N'0000', N'super@rajwada.com', N'SUPER@RAJWADA.COM', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (3, N'Admin', N'Rajwada', 0, NULL, N'1', NULL, N'AQAAAAIAAYagAAAAED+2hOVSZ1aqCtpznesXwNPy5floyQgOahjs/Galb61e0HdTq4VOky1Rczv/jd5IHg==', N'admin@rajwada.com', N'ADMIN@RAJWADA.COM', N'RGYUMQDF4JZC5ZP54MAUBBHBSYFGLC3M', 1, N'c4b58771-a8e4-4148-a67d-61b6f8999e7d', 0, 0, 0, NULL, 0, N'1111111111', N'admin@rajwada.com', N'ADMIN@RAJWADA.COM', NULL, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AspNetUsers] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetGroups] ON 
GO
INSERT [dbo].[AssetGroups] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'CAM', N'Camera', 0, CAST(N'2024-09-14T17:31:53.7275151' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AssetGroups] OFF
GO
SET IDENTITY_INSERT [dbo].[Assets] ON 
GO
INSERT [dbo].[Assets] ([Id], [Code], [UomId], [TypeId], [GroupId], [Name], [Status], [Date], [Member], [Key], [GroupName], [TypeName], [UomName]) VALUES (1, N'DEMO', 1, 1, 1, N'DEMO', 0, CAST(N'2024-09-14T17:54:45.0939513' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'', N'', N'')
GO
SET IDENTITY_INSERT [dbo].[Assets] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetTypes] ON 
GO
INSERT [dbo].[AssetTypes] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'FA', N'Fixed Asset', 0, CAST(N'2024-09-29T08:50:37.5432703' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AssetTypes] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (2, N'CB', N'Consumption Base', 0, CAST(N'2024-09-29T08:50:37.5432708' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AssetTypes] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (3, N'SA', N'Service Assets', 0, CAST(N'2024-09-29T08:50:37.5432713' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AssetTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Companys] ON 
GO
INSERT [dbo].[Companys] ([Id], [Code], [Type], [Zone], [Address1], [Address2], [Address3], [Country], [State], [City], [PinCode], [Latitude], [Longitude], [PhoneNumber], [Email], [Website], [ContactName], [Logo], [QrCode], [Currency], [GSTNo], [PanNo], [TinNo], [ParentId], [Name], [Status], [Date], [Member], [Key], [ParentName], [BelongTo]) VALUES (1, N'RE', N'Enterprise', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Rajwara', 0, CAST(N'2024-09-29T08:50:37.5431957' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'', NULL)
GO
INSERT [dbo].[Companys] ([Id], [Code], [Type], [Zone], [Address1], [Address2], [Address3], [Country], [State], [City], [PinCode], [Latitude], [Longitude], [PhoneNumber], [Email], [Website], [ContactName], [Logo], [QrCode], [Currency], [GSTNo], [PanNo], [TinNo], [ParentId], [Name], [Status], [Date], [Member], [Key], [ParentName], [BelongTo]) VALUES (2, N'CP', N'Company', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Company 1', 1, CAST(N'2024-09-19T06:36:34.0468691' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Companys] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 
GO
INSERT [dbo].[Departments] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'CI', N'Civil', 0, CAST(N'2024-09-29T08:50:37.5432504' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Departments] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (2, N'LE', N'Legal', 0, CAST(N'2024-09-29T08:50:37.5432513' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[Plans] ON 
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (1, NULL, N'Tower A', 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 5, NULL, N'Tower A', CAST(N'2024-09-14T21:32:51.8773938' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), N'', N'tower')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (2, NULL, N'1st Floor', 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Flore 1', CAST(N'2024-09-14T21:33:29.4809564' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), N'', N'floor')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (3, NULL, N'1st Floor A', 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 2, N'1A', CAST(N'2024-09-14T19:40:42.9319204' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), N'', N'flat')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (4, NULL, N'Flat b', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 2, N'Flat B', CAST(N'2024-09-14T21:04:47.6805565' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, NULL)
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (5, NULL, N'floor c', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 2, N'Flat C', CAST(N'2024-09-14T21:06:16.4293185' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, NULL)
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (6, NULL, N'Flat d', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 2, N'Flat D', CAST(N'2024-09-14T21:25:48.0968069' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'flat')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (7, NULL, N'1E', 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 2, N'Flat E', CAST(N'2024-09-14T21:30:47.9307347' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'flat')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (8, NULL, N'Tower B', 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(N'2024-10-07T00:00:00.0000000' AS DateTime2), CAST(N'2024-10-10T00:00:00.0000000' AS DateTime2), NULL, NULL, NULL, NULL, NULL, N'Tower B', CAST(N'2024-10-09T13:00:43.7800701' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'tower')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (9, NULL, N'Floor 2', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, NULL, 1, N'Floor 2', CAST(N'2024-09-14T21:34:07.3735153' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'floor')
GO
SET IDENTITY_INSERT [dbo].[Plans] OFF
GO
SET IDENTITY_INSERT [dbo].[Privileges] ON 
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (1, N'add', N'user', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (2, N'edit', N'user', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (3, N'delete', N'user', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (4, N'view', N'user', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (5, N'list', N'user', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (6, N'add', N'role', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (7, N'edit', N'role', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (8, N'delete', N'role', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (9, N'view', N'role', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10, N'list', N'role', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (11, N'add', N'user', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (12, N'edit', N'user', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (13, N'delete', N'user', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (14, N'view', N'user', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (15, N'list', N'user', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (16, N'add', N'role', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (17, N'edit', N'role', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (18, N'delete', N'role', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (19, N'view', N'role', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20, N'list', N'role', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (21, N'add', N'company', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (22, N'edit', N'company', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (23, N'delete', N'company', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (24, N'view', N'company', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (25, N'list', N'company', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (26, N'add', N'project', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (27, N'edit', N'project', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (28, N'delete', N'project', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (29, N'view', N'project', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30, N'list', N'project', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (31, N'list', N'department', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (32, N'list', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (33, N'view', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (34, N'add', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (35, N'edit', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (36, N'delete', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (37, N'list', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (38, N'view', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (39, N'add', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (40, N'edit', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (41, N'delete', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (42, N'list', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (43, N'view', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (44, N'add', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (45, N'edit', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (46, N'delete', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (47, N'list', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (48, N'view', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (49, N'add', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (50, N'edit', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (51, N'delete', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (52, N'list', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (53, N'view', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (54, N'add', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (55, N'edit', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (56, N'delete', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (57, N'list', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (58, N'view', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (59, N'add', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (60, N'edit', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (61, N'delete', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (62, N'assign', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (63, N'list', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (64, N'view', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (65, N'add', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (66, N'edit', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (67, N'delete', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (68, N'list', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (69, N'view', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (70, N'add', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (71, N'edit', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (72, N'delete', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (73, N'list', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (74, N'view', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (75, N'add', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (76, N'edit', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (77, N'delete', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (78, N'assign', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (79, N'list', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (80, N'view', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (81, N'add', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (82, N'edit', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (83, N'delete', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (84, N'assign', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (85, N'list', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (86, N'view', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (87, N'add', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (88, N'edit', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (89, N'delete', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (90, N'list', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (91, N'view', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (92, N'list', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (93, N'view', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (94, N'list', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (95, N'view', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (96, N'list', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (97, N'view', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (98, N'list', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (99, N'view', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (100, N'view', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (101, N'list', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (102, N'view', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (103, N'view', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (104, N'list', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (105, N'list', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (106, N'view', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Privileges] OFF
GO
SET IDENTITY_INSERT [dbo].[Projects] ON 
GO
INSERT [dbo].[Projects] ([Id], [Code], [StartFinYear], [BelongTo], [Zone], [Address1], [Address2], [Address3], [Country], [City], [PinCode], [Latitude], [Longitude], [PhoneNumber], [ContactName], [Status], [State], [ApprovalStatus], [BudgetAmount], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [ParentId], [CompanyId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [CompanyName], [WorkflowState], [ParentName]) VALUES (5, N'DEMO', N'2024', N'2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, CAST(N'2024-12-22T00:00:00.0000000' AS DateTime2), NULL, NULL, N'DEMO', CAST(N'2024-09-21T05:54:24.6362243' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), N'', NULL, NULL)
GO
INSERT [dbo].[Projects] ([Id], [Code], [StartFinYear], [BelongTo], [Zone], [Address1], [Address2], [Address3], [Country], [City], [PinCode], [Latitude], [Longitude], [PhoneNumber], [ContactName], [Status], [State], [ApprovalStatus], [BudgetAmount], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [ParentId], [CompanyId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [CompanyName], [WorkflowState], [ParentName]) VALUES (6, N'PROJ_01', N'2024', N'1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), NULL, NULL, N'Project 1', CAST(N'2024-09-21T06:12:54.3968762' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Projects] OFF
GO
SET IDENTITY_INSERT [dbo].[Uoms] ON 
GO
INSERT [dbo].[Uoms] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'UNIT', N'Unit', 0, CAST(N'2024-09-14T17:54:21.1005800' AS DateTime2), N'admin@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Uoms] OFF
GO
ALTER TABLE [dbo].[Plans] ADD  DEFAULT ((0.0)) FOR [BudgetAmount]
GO
ALTER TABLE [dbo].[Plans] ADD  DEFAULT ((0.0)) FOR [Cost]
GO
ALTER TABLE [dbo].[Plans] ADD  DEFAULT ((0.0)) FOR [TotalCost]
GO
ALTER TABLE [dbo].[Plans] ADD  DEFAULT ((0.0)) FOR [BudgetAllocationAmount]
GO
ALTER TABLE [dbo].[Projects] ADD  DEFAULT ((0.0)) FOR [BudgetAmount]
GO
ALTER TABLE [dbo].[Projects] ADD  DEFAULT ((0.0)) FOR [TotalCost]
GO
ALTER TABLE [dbo].[Projects] ADD  DEFAULT ((0.0)) FOR [BudgetAllocationAmount]
GO
ALTER TABLE [dbo].[Activities]  WITH CHECK ADD  CONSTRAINT [FK_Activities_Activities_ParentId] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Activities] ([Id])
GO
ALTER TABLE [dbo].[Activities] CHECK CONSTRAINT [FK_Activities_Activities_ParentId]
GO
ALTER TABLE [dbo].[Activities]  WITH CHECK ADD  CONSTRAINT [FK_Activities_Projects_ProjectId] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([Id])
GO
ALTER TABLE [dbo].[Activities] CHECK CONSTRAINT [FK_Activities_Projects_ProjectId]
GO
ALTER TABLE [dbo].[ActivityDependencies]  WITH CHECK ADD  CONSTRAINT [FK_ActivityDependencies_Activities_FromActivityId] FOREIGN KEY([FromActivityId])
REFERENCES [dbo].[Activities] ([Id])
GO
ALTER TABLE [dbo].[ActivityDependencies] CHECK CONSTRAINT [FK_ActivityDependencies_Activities_FromActivityId]
GO
ALTER TABLE [dbo].[ActivityDependencies]  WITH CHECK ADD  CONSTRAINT [FK_ActivityDependencies_Activities_ToActivityId] FOREIGN KEY([ToActivityId])
REFERENCES [dbo].[Activities] ([Id])
GO
ALTER TABLE [dbo].[ActivityDependencies] CHECK CONSTRAINT [FK_ActivityDependencies_Activities_ToActivityId]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUsers]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUsers_AspNetUsers_ParentId] FOREIGN KEY([ParentId])
REFERENCES [dbo].[AspNetUsers] ([Id])
GO
ALTER TABLE [dbo].[AspNetUsers] CHECK CONSTRAINT [FK_AspNetUsers_AspNetUsers_ParentId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Assets]  WITH CHECK ADD  CONSTRAINT [FK_Assets_AssetGroups_GroupId] FOREIGN KEY([GroupId])
REFERENCES [dbo].[AssetGroups] ([Id])
GO
ALTER TABLE [dbo].[Assets] CHECK CONSTRAINT [FK_Assets_AssetGroups_GroupId]
GO
ALTER TABLE [dbo].[Assets]  WITH CHECK ADD  CONSTRAINT [FK_Assets_AssetTypes_TypeId] FOREIGN KEY([TypeId])
REFERENCES [dbo].[AssetTypes] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Assets] CHECK CONSTRAINT [FK_Assets_AssetTypes_TypeId]
GO
ALTER TABLE [dbo].[Assets]  WITH CHECK ADD  CONSTRAINT [FK_Assets_Uoms_UomId] FOREIGN KEY([UomId])
REFERENCES [dbo].[Uoms] ([Id])
GO
ALTER TABLE [dbo].[Assets] CHECK CONSTRAINT [FK_Assets_Uoms_UomId]
GO
ALTER TABLE [dbo].[Companys]  WITH CHECK ADD  CONSTRAINT [FK_Companys_Companys_ParentId] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Companys] ([Id])
GO
ALTER TABLE [dbo].[Companys] CHECK CONSTRAINT [FK_Companys_Companys_ParentId]
GO
ALTER TABLE [dbo].[Plans]  WITH CHECK ADD  CONSTRAINT [FK_Plans_Plans_ParentId] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Plans] ([Id])
GO
ALTER TABLE [dbo].[Plans] CHECK CONSTRAINT [FK_Plans_Plans_ParentId]
GO
ALTER TABLE [dbo].[Plans]  WITH CHECK ADD  CONSTRAINT [FK_Plans_Projects_ProjectId] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([Id])
GO
ALTER TABLE [dbo].[Plans] CHECK CONSTRAINT [FK_Plans_Projects_ProjectId]
GO
ALTER TABLE [dbo].[Privileges]  WITH CHECK ADD  CONSTRAINT [FK_Privileges_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
GO
ALTER TABLE [dbo].[Privileges] CHECK CONSTRAINT [FK_Privileges_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Companys_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Companys] ([Id])
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Companys_CompanyId]
GO
ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_Projects_Projects_ParentId] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Projects] ([Id])
GO
ALTER TABLE [dbo].[Projects] CHECK CONSTRAINT [FK_Projects_Projects_ParentId]
GO
