USE [Rajwada]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Activities]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[ActivityResources]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[ApplicationLogs]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AssetGroups]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Assets]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[AssetTypes]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Companys]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Contractors]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contractors](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[PanNo] [nvarchar](max) NULL,
	[GSTNo] [nvarchar](max) NULL,
	[LicenceNo] [nvarchar](max) NULL,
	[EffectiveStartDate] [datetime2](7) NULL,
	[EffectiveEndDate] [datetime2](7) NULL,
	[SPOC] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_Contractors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departments]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Dependencies]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dependencies](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[Type] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Dependencies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mouzas]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mouzas](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Gl_No] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_Mouzas] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NameMasters]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NameMasters](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[LLName] [nvarchar](max) NULL,
	[FatherName] [nvarchar](max) NULL,
	[FatherCertificate] [nvarchar](max) NULL,
	[MotherName] [nvarchar](max) NULL,
	[MotherCertificate] [nvarchar](max) NULL,
	[GrandFatherName] [nvarchar](max) NULL,
	[GrandFatherCertificate] [nvarchar](max) NULL,
	[GrandMotherName] [nvarchar](max) NULL,
	[GrandMotherCertificate] [nvarchar](max) NULL,
	[LrNo] [nvarchar](max) NULL,
	[MouzaId] [bigint] NULL,
	[MouzaName] [nvarchar](max) NULL,
	[RsDaagId] [bigint] NULL,
	[RsDaagNo] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[FatherStatus] [nvarchar](max) NULL,
	[GrandFatherStatus] [nvarchar](max) NULL,
	[GrandMotherStatus] [nvarchar](max) NULL,
	[MotherStatus] [nvarchar](max) NULL,
 CONSTRAINT [PK_NameMasters] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Plans]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Privileges]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Projects]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Rooms]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rooms](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_Rooms] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RsDaags]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RsDaags](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[RsDaagNo] [nvarchar](max) NULL,
	[Area] [nvarchar](max) NULL,
	[RsKhatian] [nvarchar](max) NULL,
	[LrNo] [nvarchar](max) NULL,
	[LrKhatian] [nvarchar](max) NULL,
	[RsParcha] [nvarchar](max) NULL,
	[ConcernArea] [nvarchar](max) NULL,
	[MouzaId] [bigint] NULL,
	[MouzaName] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Status] [int] NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
 CONSTRAINT [PK_RsDaags] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Uoms]    Script Date: 12/28/2024 5:19:45 AM ******/
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
/****** Object:  Table [dbo].[Workflows]    Script Date: 12/28/2024 5:19:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Workflows](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](max) NULL,
	[Status] [int] NULL,
	[Data] [nvarchar](max) NULL,
	[Name] [nvarchar](511) NULL,
	[Date] [datetime2](7) NULL,
	[Member] [nvarchar](255) NULL,
	[Key] [nvarchar](255) NULL,
	[Type] [nvarchar](max) NULL,
	[ProjectId] [bigint] NULL,
	[ProjectName] [nvarchar](max) NULL,
	[FlatId] [bigint] NULL,
	[FloorId] [bigint] NULL,
	[TowerId] [bigint] NULL,
 CONSTRAINT [PK_Workflows] PRIMARY KEY CLUSTERED 
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
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241011105032_workflow', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241011110043_wfm', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241013074700_Auth-migration', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241013075158_Auth-migration', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241013075251_API-Migration', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241015055329_wf1', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241020042010_dependency', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241114054538_le', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241116145102_dependencyModelChange', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241124123048_un', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241126104112_rm', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241130181458_projectIdFieldForWorkflow', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241205061904_con', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241205070817_con1', N'8.0.8')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20241208074734_WorkflowSchemaChange', N'8.0.8')
GO
SET IDENTITY_INSERT [dbo].[Activities] ON 
GO
INSERT [dbo].[Activities] ([Id], [Description], [Type], [DocumentLinks], [Notes], [PriorityStatus], [WorkflowState], [ApprovalStatus], [CostEstimate], [ActualCost], [StartDate], [EndDate], [ActualStartDate], [ActualEndDate], [Duration], [ProgressPercentage], [ProjectId], [ParentId], [ParentName], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'sss', N'Main Task', NULL, NULL, NULL, NULL, NULL, CAST(12345.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(N'2024-12-14T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-27T00:00:00.0000000' AS DateTime2), NULL, NULL, 0, 0, 1, NULL, NULL, N'Activity 1', 0, CAST(N'2024-12-14T11:09:16.5045415' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Activities] OFF
GO
SET IDENTITY_INSERT [dbo].[ApplicationLogs] ON 
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (1, 1, 0, NULL, N'Company', 0, CAST(N'2024-12-08T07:47:31.6834645' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (2, 1, 0, NULL, N'Department', 0, CAST(N'2024-12-08T07:47:31.6834650' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (3, 2, 0, NULL, N'Department', 0, CAST(N'2024-12-08T07:47:31.6834652' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (4, 1, 0, N'{"Code":"B_01","Id":1,"Name":"Bag","Status":0,"Date":"2024-09-15T08:43:54.2783679Z","Member":"a.bose@example.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Uom', NULL, CAST(N'2024-09-15T08:43:54.3849406' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (5, 1, 0, N'{"Code":"BM","Assets":null,"Id":1,"Name":"Building Material","Status":0,"Date":"2024-09-15T08:44:10.8199044Z","Member":"a.bose@example.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'AssetGroup', NULL, CAST(N'2024-09-15T08:44:10.8715777' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (6, 1, 0, N'{"Code":"SAN_001","UomId":1,"Uom":null,"UomName":null,"TypeId":2,"Type":null,"TypeName":null,"GroupId":1,"Group":null,"GroupName":null,"Id":1,"Name":"Sand Small Grain","Status":0,"Date":"2024-09-15T08:44:31.7680395Z","Member":"a.bose@example.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Asset', NULL, CAST(N'2024-09-15T08:44:31.8463456' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (7, 2, 0, N'{"Code":"SAN_002","UomId":1,"Uom":null,"UomName":null,"TypeId":2,"Type":null,"TypeName":null,"GroupId":1,"Group":null,"GroupName":null,"Id":2,"Name":"Sand Medium Grain","Status":0,"Date":"2024-09-15T08:44:57.1086826Z","Member":"a.bose@example.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Asset', NULL, CAST(N'2024-09-15T08:44:57.1137555' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (8, 3, 0, N'{"Code":"QC","Id":3,"Name":"Quality","Status":0,"Date":"2024-09-19T17:38:18.809643Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Department', NULL, CAST(N'2024-09-19T17:38:18.9041713' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (9, 2, 0, N'{"Code":"S_01","Id":2,"Name":"Sack","Status":0,"Date":"2024-09-19T17:43:48.504296Z","Member":"a.bose@example.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Uom', NULL, CAST(N'2024-09-19T17:43:48.5352775' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (10008, 1, 0, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":0,"WorkflowState":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":"2024-09-23T00:00:00","PlanEndDate":"2024-11-25T00:00:00","CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"CompanyId":null,"Company":null,"CompanyName":null,"Plans":null,"Id":1,"Name":"Project 1","Date":"2024-09-21T06:11:53.0675599Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-21T06:11:53.2316806' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (20008, 1, 1, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"WorkflowState":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":"2024-09-23T00:00:00","PlanEndDate":"2024-11-25T00:00:00","CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"ParentName":null,"CompanyId":1,"Company":null,"CompanyName":"Rajwara","Plans":null,"Id":1,"Name":"Project 1","Date":"2024-09-22T17:46:08.1501942Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-22T17:46:08.3207220' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (30008, 1, 1, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"WorkflowState":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":"2024-09-23T00:00:00","PlanEndDate":"2024-11-25T00:00:00","CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"ParentName":null,"CompanyId":1,"Company":null,"CompanyName":"Rajwara","Plans":null,"Id":1,"Name":"Project 1","Date":"2024-09-29T12:03:56.1412796Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-29T12:03:56.4668874' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (30009, 1, 1, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"WorkflowState":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":"2024-09-23T00:00:00","PlanEndDate":"2024-11-25T00:00:00","CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"ParentName":null,"CompanyId":1,"Company":null,"CompanyName":"Rajwara","Plans":null,"Id":1,"Name":"Project 1","Date":"2024-09-29T12:04:11.7783282Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-29T12:04:11.7840502' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (30010, 1, 1, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"WorkflowState":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":"2024-09-23T00:00:00","PlanEndDate":"2024-11-25T00:00:00","CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"ParentName":null,"CompanyId":1,"Company":null,"CompanyName":"Rajwara","Plans":null,"Id":1,"Name":"Project 1","Date":"2024-09-29T12:08:06.6306973Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-29T12:08:06.9394574' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (30011, 1, 1, N'{"Code":"PROJ_01","StartFinYear":"2024","BelongTo":"1","Zone":null,"Address1":null,"Address2":null,"Address3":null,"Country":null,"State":null,"City":null,"PinCode":null,"Latitude":null,"Longitude":null,"PhoneNumber":null,"ContactName":null,"Status":1,"WorkflowState":null,"ApprovalStatus":null,"BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"TotalCost":0.0,"PlanStartDate":"2024-09-23T00:00:00","PlanEndDate":"2024-11-25T00:00:00","CompletionCertificateDate":"2024-12-16T00:00:00","ParentId":null,"Parent":null,"ParentName":null,"CompanyId":1,"Company":null,"CompanyName":"Rajwara","Plans":null,"Id":1,"Name":"Project 1","Date":"2024-09-29T12:08:22.3628924Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Project', NULL, CAST(N'2024-09-29T12:08:22.3699329' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (40008, 2, 1, N'{"Code":"SAN_002","UomId":1,"Uom":null,"UomName":null,"TypeId":2,"Type":null,"TypeName":null,"GroupId":1,"Group":null,"GroupName":null,"Id":2,"Name":"Sand Medium Grain","Status":1,"Date":"2024-10-06T16:17:18.1718986Z","Member":"a.bose@example.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Asset', NULL, CAST(N'2024-10-06T16:17:18.3208862' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (50008, 1, 0, N'{"Code":null,"Description":"Tower A","Status":0,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":null,"Id":1,"Name":"Tower A","Date":"2024-10-13T08:06:58.6460632Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-13T08:06:58.7560912' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (50009, 2, 0, N'{"Code":null,"Description":"Tower B","Status":0,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":null,"Id":2,"Name":"Tower B","Date":"2024-10-13T08:07:13.4168664Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-13T08:07:13.4195476' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (50010, 3, 0, N'{"Code":null,"Description":"Floor 1 of Tower A","Status":0,"State":null,"ApprovalStatus":null,"Type":"floor","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":1,"Parent":{"Code":null,"Description":"Tower A","Status":0,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.00,"BudgetAllocationAmount":0.00,"Cost":0.00,"TotalCost":0.00,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":[],"Id":1,"Name":"Tower A","Date":"2024-10-13T08:06:58.6460632","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"},"ParentName":"Tower A","Plans":null,"Id":3,"Name":"Floor 1","Date":"2024-10-13T08:07:48.7103865Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-13T08:07:48.7307395' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (50011, 4, 0, N'{"Code":null,"Description":"Floor 2 of Tower A","Status":0,"State":null,"ApprovalStatus":null,"Type":"floor","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":1,"Parent":{"Code":null,"Description":"Tower A","Status":0,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.00,"BudgetAllocationAmount":0.00,"Cost":0.00,"TotalCost":0.00,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":[],"Id":1,"Name":"Tower A","Date":"2024-10-13T08:06:58.6460632","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"},"ParentName":"Tower A","Plans":null,"Id":4,"Name":"Floor 2","Date":"2024-10-13T08:08:09.4678698Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-13T08:08:09.4730942' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (50012, 5, 0, N'{"Code":null,"Description":"Floor 1 of Tower B","Status":0,"State":null,"ApprovalStatus":null,"Type":"floor","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":2,"Parent":{"Code":null,"Description":"Tower B","Status":0,"State":null,"ApprovalStatus":null,"Type":"tower","BudgetAmount":0.00,"BudgetAllocationAmount":0.00,"Cost":0.00,"TotalCost":0.00,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":null,"Parent":null,"ParentName":null,"Plans":[],"Id":2,"Name":"Tower B","Date":"2024-10-13T08:07:13.4168664","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"},"ParentName":"Tower B","Plans":null,"Id":5,"Name":"Floor 1","Date":"2024-10-13T08:08:24.8933348Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-13T08:08:24.8960611' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (50013, 6, 0, N'{"Code":null,"Description":"Flat 1A","Status":0,"State":null,"ApprovalStatus":null,"Type":"flat","BudgetAmount":0.0,"BudgetAllocationAmount":0.0,"Cost":0.0,"TotalCost":0.0,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":5,"Parent":{"Code":null,"Description":"Floor 1 of Tower B","Status":0,"State":null,"ApprovalStatus":null,"Type":"floor","BudgetAmount":0.00,"BudgetAllocationAmount":0.00,"Cost":0.00,"TotalCost":0.00,"PlanStartDate":null,"PlanEndDate":null,"CompletionCertificateDate":null,"StartDate":null,"EndDate":null,"Selected":true,"ProjectId":1,"Project":null,"ParentId":2,"Parent":null,"ParentName":null,"Plans":[],"Id":5,"Name":"Floor 1","Date":"2024-10-13T08:08:24.8933348","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"},"ParentName":"Floor 1","Plans":null,"Id":6,"Name":"Flat 1A","Date":"2024-10-13T08:08:56.2940669Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Plan', NULL, CAST(N'2024-10-13T08:08:56.2983603' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60008, 1, 0, N'{"Code":"HACK","Description":"Hacking","Id":1,"Name":"Hacking","Status":0,"Date":"2024-10-31T05:07:11.8230509Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:07:11.9353418' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60009, 2, 0, N'{"Code":"BRKW","Description":"Brick Work","Id":2,"Name":"Brick Work","Status":0,"Date":"2024-10-31T05:07:35.5297951Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:07:35.5337951' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60010, 3, 0, N'{"Code":"ELECW","Description":"Electrical Work","Id":3,"Name":"Electrical Work","Status":0,"Date":"2024-10-31T05:08:01.4324683Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:08:01.4356407' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60011, 4, 0, N'{"Code":"PLMBW","Description":"Plumbing Work","Id":4,"Name":"Plumbing Work","Status":0,"Date":"2024-10-31T05:08:28.2399736Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:08:28.2429276' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60012, 5, 0, N'{"Code":"WOODW","Description":"Wooden Work","Id":5,"Name":"Wooden Work","Status":0,"Date":"2024-10-31T05:08:51.0818641Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:08:51.0846332' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60013, 6, 0, N'{"Code":"PLSTRW","Description":"Plastering Work","Id":6,"Name":"Plastering Work","Status":0,"Date":"2024-10-31T05:09:11.6817183Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:09:11.6843599' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60014, 7, 0, N'{"Code":"PTTYW","Description":"Putty Work","Id":7,"Name":"Putty Work","Status":0,"Date":"2024-10-31T05:10:01.0708303Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:10:01.0746193' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60015, 8, 0, N'{"Code":"TILEW","Description":"Tiles Fixing","Id":8,"Name":"Tiles Fixing","Status":0,"Date":"2024-10-31T05:10:34.3851137Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:10:34.3877384' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (60016, 9, 0, N'{"Code":"PAINTW","Description":"Painting Work","Id":9,"Name":"Painting Work","Status":0,"Date":"2024-10-31T05:10:50.3635047Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-10-31T05:10:50.3666978' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (70008, 10002, 0, N'{"Code":"CEMENTW","Description":"Cement Work","Id":10002,"Name":"Cement Work","Status":0,"Date":"2024-11-01T11:15:47.6514042Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-11-01T11:15:47.8270257' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80008, 1, 1, N'{"Code":"HACK","Description":"Hacking","Id":1,"Name":"Hacking","Status":1,"Date":"2024-11-07T16:26:08.1791441Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Dependency', NULL, CAST(N'2024-11-07T16:26:08.3330583' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80009, 4, 0, N'{"Code":"sdsd","Id":4,"Name":"abcd","Status":0,"Date":"2024-11-09T16:53:20.7833661Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Department', NULL, CAST(N'2024-11-09T16:53:20.9170386' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80010, 4, 1, N'{"Code":"sdsd","Id":4,"Name":"abcd111","Status":1,"Date":"2024-11-09T16:54:58.2815537Z","Member":"super@rajwada.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Department', NULL, CAST(N'2024-11-09T16:54:58.2912930' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80011, 1, 0, N'{"Code":"DT1","Type":"Inside","Data":"{\"nodes\":[{\"id\":\"node_0\",\"node\":{\"data\":{\"label\":\"Hacking\"},\"type\":\"customNode\",\"color\":\"#95FFCE\"},\"position\":{\"x\":130,\"y\":41.25},\"type\":\"customNode\",\"data\":{\"label\":\"Hacking\"},\"style\":{\"background\":\"#95FFCE\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"selected\":false,\"dragging\":false,\"positionAbsolute\":{\"x\":130,\"y\":41.25}},{\"id\":\"node_1\",\"node\":{\"data\":{\"label\":\"Brick Work\"},\"type\":\"customNode\",\"color\":\"#BCFFFF\"},\"position\":{\"x\":145,\"y\":150.25},\"type\":\"customNode\",\"data\":{\"label\":\"Brick Work\"},\"style\":{\"background\":\"#BCFFFF\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"selected\":false,\"positionAbsolute\":{\"x\":145,\"y\":150.25},\"dragging\":false},{\"id\":\"node_2\",\"node\":{\"data\":{\"label\":\"Wooden Work\"},\"type\":\"customNode\",\"color\":\"#FFFFBB\"},\"position\":{\"x\":464,\"y\":125.25},\"type\":\"customNode\",\"data\":{\"label\":\"Wooden Work\"},\"style\":{\"background\":\"#FFFFBB\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"positionAbsolute\":{\"x\":464,\"y\":125.25}}],\"edges\":[{\"source\":\"node_0\",\"sourceHandle\":\"c\",\"target\":\"node_1\",\"targetHandle\":\"b\",\"markerEnd\":{\"type\":\"arrowclosed\",\"width\":20,\"height\":20,\"color\":\"#2f303d\"},\"style\":{\"strokeWidth\":2,\"stroke\":\"#2f303d\"},\"id\":\"reactflow__edge-node_0c-node_1b\"}],\"viewport\":{\"x\":-20,\"y\":-34,\"zoom\":1}}","ProjectId":1,"Project":null,"ProjectName":null,"TowerId":1,"Tower":null,"FloorId":null,"Floor":null,"FlatId":null,"Flat":null,"Id":1,"Name":"Dependency Test1","Status":0,"Date":"2024-12-14T10:56:04.6548693Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Workflow', NULL, CAST(N'2024-12-14T10:56:04.6644041' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80012, 1, 1, N'{"Code":"DT1","Type":"Inside","Data":"{\"nodes\":[{\"id\":\"node_0\",\"node\":{\"data\":{\"label\":\"Hacking\"},\"type\":\"customNode\",\"color\":\"#95FFCE\"},\"position\":{\"x\":130,\"y\":41.25},\"type\":\"customNode\",\"data\":{\"label\":\"Hacking\"},\"style\":{\"background\":\"#95FFCE\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"selected\":false,\"dragging\":false,\"positionAbsolute\":{\"x\":130,\"y\":41.25}},{\"id\":\"node_1\",\"node\":{\"data\":{\"label\":\"Brick Work\"},\"type\":\"customNode\",\"color\":\"#BCFFFF\"},\"position\":{\"x\":145,\"y\":150.25},\"type\":\"customNode\",\"data\":{\"label\":\"Brick Work\"},\"style\":{\"background\":\"#BCFFFF\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"selected\":false,\"positionAbsolute\":{\"x\":145,\"y\":150.25},\"dragging\":false},{\"id\":\"node_2\",\"node\":{\"data\":{\"label\":\"Wooden Work\"},\"type\":\"customNode\",\"color\":\"#FFFFBB\"},\"position\":{\"x\":464,\"y\":125.25},\"type\":\"customNode\",\"data\":{\"label\":\"Wooden Work\"},\"style\":{\"background\":\"#FFFFBB\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"positionAbsolute\":{\"x\":464,\"y\":125.25}}],\"edges\":[{\"source\":\"node_0\",\"sourceHandle\":\"c\",\"target\":\"node_1\",\"targetHandle\":\"b\",\"markerEnd\":{\"type\":\"arrowclosed\",\"width\":20,\"height\":20,\"color\":\"#2f303d\"},\"style\":{\"strokeWidth\":2,\"stroke\":\"#2f303d\"},\"id\":\"reactflow__edge-node_0c-node_1b\"}],\"viewport\":{\"x\":0,\"y\":0,\"zoom\":1}}","ProjectId":1,"Project":null,"ProjectName":null,"TowerId":1,"Tower":null,"FloorId":null,"Floor":null,"FlatId":null,"Flat":null,"Id":1,"Name":"Dependency Test1","Status":1,"Date":"2024-12-14T11:05:30.7402771Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Workflow', NULL, CAST(N'2024-12-14T11:05:30.7455498' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80013, 1, 0, N'{"Description":"sss","Type":"Main Task","DocumentLinks":null,"Notes":null,"PriorityStatus":null,"WorkflowState":null,"ApprovalStatus":null,"CostEstimate":12345.0,"ActualCost":0.0,"StartDate":"2024-12-14T00:00:00","EndDate":"2024-12-27T00:00:00","ActualStartDate":null,"ActualEndDate":null,"Duration":0,"ProgressPercentage":0,"ProjectId":1,"ParentId":null,"ParentName":null,"Id":1,"Name":"Activity 1","Status":0,"Date":"2024-12-14T11:09:16.5045415Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Activity', NULL, CAST(N'2024-12-14T11:09:16.5578122' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80014, 1, 1, N'{"Code":"DT1","Type":"Inside","Data":"{\"nodes\":[{\"id\":\"node_0\",\"node\":{\"data\":{\"label\":\"Hacking\"},\"type\":\"customNode\",\"color\":\"#95FFCE\"},\"position\":{\"x\":130,\"y\":41.25},\"type\":\"customNode\",\"data\":{\"label\":\"Hacking\"},\"style\":{\"background\":\"#95FFCE\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"selected\":false,\"dragging\":false,\"positionAbsolute\":{\"x\":130,\"y\":41.25}},{\"id\":\"node_1\",\"node\":{\"data\":{\"label\":\"Brick Work\"},\"type\":\"customNode\",\"color\":\"#BCFFFF\"},\"position\":{\"x\":145,\"y\":150.25},\"type\":\"customNode\",\"data\":{\"label\":\"Brick Work\"},\"style\":{\"background\":\"#BCFFFF\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"selected\":false,\"positionAbsolute\":{\"x\":145,\"y\":150.25},\"dragging\":false},{\"id\":\"node_2\",\"node\":{\"data\":{\"label\":\"Wooden Work\"},\"type\":\"customNode\",\"color\":\"#FFFFBB\"},\"position\":{\"x\":464,\"y\":125.25},\"type\":\"customNode\",\"data\":{\"label\":\"Wooden Work\"},\"style\":{\"background\":\"#FFFFBB\",\"borderRadius\":\"25px\"},\"width\":150,\"height\":50,\"positionAbsolute\":{\"x\":464,\"y\":125.25}}],\"edges\":[{\"source\":\"node_0\",\"sourceHandle\":\"c\",\"target\":\"node_1\",\"targetHandle\":\"b\",\"markerEnd\":{\"type\":\"arrowclosed\",\"width\":20,\"height\":20,\"color\":\"#2f303d\"},\"style\":{\"strokeWidth\":2,\"stroke\":\"#2f303d\"},\"id\":\"reactflow__edge-node_0c-node_1b\"}],\"viewport\":{\"x\":0,\"y\":0,\"zoom\":1}}","ProjectId":1,"Project":null,"ProjectName":null,"TowerId":1,"Tower":null,"FloorId":null,"Floor":null,"FlatId":null,"Flat":null,"Id":1,"Name":"Dependency Test1","Status":1,"Date":"2024-12-14T17:21:52.2700543Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Workflow', NULL, CAST(N'2024-12-14T17:21:52.3577125' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[ApplicationLogs] ([Id], [EntityId], [ActivityType], [ContentHistory], [Name], [Status], [Date], [Member], [Key]) VALUES (80015, 1, 0, N'{"Code":null,"Gl_No":"1234567","Id":1,"Name":"Mouza 1","Status":0,"Date":"2024-12-15T11:12:47.235766Z","Member":"a.bose@test.com","Key":"1536B022-C5C9-4358-BB6A-466F2075B7D4"}', N'Mouza', NULL, CAST(N'2024-12-15T11:12:47.2769723' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
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
INSERT [dbo].[AspNetRoles] ([Id], [Name], [NormalizedName], [ConcurrencyStamp], [Member], [Key]) VALUES (5, N'Civil Head', NULL, NULL, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AspNetRoles] OFF
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (1, 1)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (2, 2)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (3, 3)
GO
INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (4, 5)
GO
SET IDENTITY_INSERT [dbo].[AspNetUsers] ON 
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (1, N'Root', N'', 0, NULL, NULL, NULL, N'AQAAAAIAAYagAAAAEIUXHqy53Dre8nfwKZJ/mfDjLdtvMcpPO0pC7M4VwCb+K+eta6c8nxYOp21EfUbGzg==', N'root', N'ROOT', N'R7JOVNY6TU5ACLDKWMJCCXJZIHNATIIJ', 1, N'a7e26408-644a-48ca-a0a7-7cb94e41315d', 0, 0, 0, NULL, 0, N'0000', N'root', N'ROOT', NULL, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (2, N'Super', N'Admin', 0, NULL, NULL, NULL, N'AQAAAAIAAYagAAAAENsAzO2V9c3Iar8PDKtxSYh0VjiauDbsIIlXIvKFd5vBXRAo+7iuamOeTdwAf3FRhg==', N'super@rajwada.com', N'SUPER@RAJWADA.COM', N'IUGIXRFKWOZ6NJFGMH3FGMX4R2IKHKL3', 1, N'1250f4e9-3ab7-4543-ab64-34f2986180d6', 0, 0, 0, CAST(N'2024-12-15T11:10:59.2026245+00:00' AS DateTimeOffset), 0, N'0000', N'super@rajwada.com', N'SUPER@RAJWADA.COM', 1, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (3, N'Adrish', N'User', 0, N'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJFMEYwODFCRUNGMDExRThBNjRDQzQyMTE5Mjk5QTQ0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJFMEYwODFBRUNGMDExRThBNjRDQzQyMTE5Mjk5QTQ0IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSIxQUMwRDYxNUU3RTUxRTAwNThENTY1NENGQTYxNTZCQyIgc3RSZWY6ZG9jdW1lbnRJRD0iMUFDMEQ2MTVFN0U1MUUwMDU4RDU2NTRDRkE2MTU2QkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwM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', N'1', N'Kolkata', N'AQAAAAIAAYagAAAAEFJb0Sl7ahTfWMeR4lSOIFyPHsJApi7lEsge3VFoVzQOsLjmS0qiPgFHp95pfpbDPQ==', N'a.bose@test.com', N'A.BOSE@TEST.COM', N'Y22OVHS2DJCRSVTWQXFBY5GFZQAFXKQV', 1, N'c6571e4e-4b0a-40ef-a968-b577a8c277d2', 0, 0, 0, NULL, 0, N'6912567803', N'a.bose@test.com', N'A.BOSE@TEST.COM', NULL, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AspNetUsers] ([Id], [FirstName], [LastName], [Disable], [PhotoUrl], [Department], [Address], [PasswordHash], [UserName], [NormalizedEmail], [SecurityStamp], [EmailConfirmed], [ConcurrencyStamp], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnabled], [LockoutEnd], [AccessFailedCount], [PhoneNumber], [Email], [NormalizedUserName], [ParentId], [Member], [Key]) VALUES (4, N'Adrish', N'Civil Head', 0, N'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc1MkU3OTlERUNFMzExRThBNjRDQzQyMTE5Mjk5QTQ0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc1MkU3OTlDRUNFMzExRThBNjRDQzQyMTE5Mjk5QTQ0IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJCMTYxREI0NDRGRUQ5RUFBNDU3RDU4RDQyNjBFNkVEQyIgc3RSZWY6ZG9jdW1lbnRJRD0iQjE2MURCNDQ0RkVEOUVBQTQ1N0Q1OEQ0MjYwRTZFREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwM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', N'1', N'Kolkata', N'AQAAAAIAAYagAAAAEH7pbVHjU4blP/vVgakGE2U3lJUAjOa8ZvPskzoVy/vYx9goZaE3pcu7L5gM7vufSw==', N'a.bose@example.com', N'A.BOSE@EXAMPLE.COM', N'244ERGJEG6TRVVZYITRX7DHUXBZBGHM5', 1, N'1ab5e4db-bfff-4bf4-a4ba-923093e1dd75', 0, 0, 0, NULL, 0, N'6912567802', N'a.bose@example.com', N'A.BOSE@EXAMPLE.COM', NULL, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AspNetUsers] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetGroups] ON 
GO
INSERT [dbo].[AssetGroups] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'BM', N'Building Material', 0, CAST(N'2024-09-15T08:44:10.8199044' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AssetGroups] OFF
GO
SET IDENTITY_INSERT [dbo].[Assets] ON 
GO
INSERT [dbo].[Assets] ([Id], [Code], [UomId], [TypeId], [GroupId], [Name], [Status], [Date], [Member], [Key], [GroupName], [TypeName], [UomName]) VALUES (1, N'SAN_001', 1, 2, 1, N'Sand Small Grain', 0, CAST(N'2024-09-15T08:44:31.7680395' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', NULL, NULL, NULL)
GO
INSERT [dbo].[Assets] ([Id], [Code], [UomId], [TypeId], [GroupId], [Name], [Status], [Date], [Member], [Key], [GroupName], [TypeName], [UomName]) VALUES (2, N'SAN_002', 1, 2, 1, N'Sand Medium Grain', 1, CAST(N'2024-10-06T16:17:18.1718986' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Assets] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetTypes] ON 
GO
INSERT [dbo].[AssetTypes] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'FA', N'Fixed Asset', 0, CAST(N'2024-12-08T07:47:31.6834685' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AssetTypes] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (2, N'CB', N'Consumption Base', 0, CAST(N'2024-12-08T07:47:31.6834688' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[AssetTypes] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (3, N'SA', N'Service Assets', 0, CAST(N'2024-12-08T07:47:31.6834690' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[AssetTypes] OFF
GO
SET IDENTITY_INSERT [dbo].[Companys] ON 
GO
INSERT [dbo].[Companys] ([Id], [Code], [Type], [Zone], [Address1], [Address2], [Address3], [Country], [State], [City], [PinCode], [Latitude], [Longitude], [PhoneNumber], [Email], [Website], [ContactName], [Logo], [QrCode], [Currency], [GSTNo], [PanNo], [TinNo], [ParentId], [Name], [Status], [Date], [Member], [Key], [ParentName], [BelongTo]) VALUES (1, N'RE', N'Enterprise', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Rajwara', 0, CAST(N'2024-12-08T07:47:31.6834450' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'', NULL)
GO
SET IDENTITY_INSERT [dbo].[Companys] OFF
GO
SET IDENTITY_INSERT [dbo].[Departments] ON 
GO
INSERT [dbo].[Departments] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'CI', N'Civil', 0, CAST(N'2024-12-08T07:47:31.6834610' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Departments] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (2, N'LE', N'Legal', 0, CAST(N'2024-12-08T07:47:31.6834613' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Departments] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (3, N'QC', N'Quality', 0, CAST(N'2024-09-19T17:38:18.8096430' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Departments] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (4, N'sdsd', N'abcd111', 1, CAST(N'2024-11-09T16:54:58.2815537' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Departments] OFF
GO
SET IDENTITY_INSERT [dbo].[Dependencies] ON 
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (1, N'HACK', N'Hacking', N'Hacking', 1, CAST(N'2024-11-07T16:26:08.1791441' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (2, N'BRKW', N'Brick Work', N'Brick Work', 0, CAST(N'2024-10-31T05:07:35.5297951' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (3, N'ELECW', N'Electrical Work', N'Electrical Work', 0, CAST(N'2024-10-31T05:08:01.4324683' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (4, N'PLMBW', N'Plumbing Work', N'Plumbing Work', 0, CAST(N'2024-10-31T05:08:28.2399736' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (5, N'WOODW', N'Wooden Work', N'Wooden Work', 0, CAST(N'2024-10-31T05:08:51.0818641' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (6, N'PLSTRW', N'Plastering Work', N'Plastering Work', 0, CAST(N'2024-10-31T05:09:11.6817183' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (7, N'PTTYW', N'Putty Work', N'Putty Work', 0, CAST(N'2024-10-31T05:10:01.0708303' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (8, N'TILEW', N'Tiles Fixing', N'Tiles Fixing', 0, CAST(N'2024-10-31T05:10:34.3851137' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (9, N'PAINTW', N'Painting Work', N'Painting Work', 0, CAST(N'2024-10-31T05:10:50.3635047' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
INSERT [dbo].[Dependencies] ([Id], [Code], [Description], [Name], [Status], [Date], [Member], [Key], [Type]) VALUES (10002, N'CEMENTW', N'Cement Work', N'Cement Work', 0, CAST(N'2024-11-01T11:15:47.6514042' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'')
GO
SET IDENTITY_INSERT [dbo].[Dependencies] OFF
GO
SET IDENTITY_INSERT [dbo].[Mouzas] ON 
GO
INSERT [dbo].[Mouzas] ([Id], [Code], [Gl_No], [Name], [Status], [Date], [Member], [Key]) VALUES (1, NULL, N'1234567', N'Mouza 1', 0, CAST(N'2024-12-15T11:12:47.2357660' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Mouzas] OFF
GO
SET IDENTITY_INSERT [dbo].[Plans] ON 
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (1, NULL, N'Tower A', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 1, NULL, N'Tower A', CAST(N'2024-10-13T08:06:58.6460632' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'tower')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (2, NULL, N'Tower B', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 1, NULL, N'Tower B', CAST(N'2024-10-13T08:07:13.4168664' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'tower')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (3, NULL, N'Floor 1 of Tower A', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 1, 1, N'Floor 1', CAST(N'2024-10-13T08:07:48.7103865' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'floor')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (4, NULL, N'Floor 2 of Tower A', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 1, 1, N'Floor 2', CAST(N'2024-10-13T08:08:09.4678698' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'floor')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (5, NULL, N'Floor 1 of Tower B', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 1, 2, N'Floor 1', CAST(N'2024-10-13T08:08:24.8933348' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'floor')
GO
INSERT [dbo].[Plans] ([Id], [Code], [Description], [Status], [State], [ApprovalStatus], [BudgetAmount], [Cost], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [StartDate], [EndDate], [ProjectId], [ParentId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [ParentName], [Type]) VALUES (6, NULL, N'Flat 1A', 0, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), NULL, NULL, NULL, NULL, NULL, 1, 5, N'Flat 1A', CAST(N'2024-10-13T08:08:56.2940669' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), NULL, N'flat')
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
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (32, N'list', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (33, N'view', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (34, N'list', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (35, N'view', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (36, N'list', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (37, N'view', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (38, N'list', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (39, N'view', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (40, N'list', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (41, N'view', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (42, N'list', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (43, N'view', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (44, N'list', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (45, N'view', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (46, N'list', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (47, N'view', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (48, N'list', N'asset', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (49, N'view', N'asset', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (50, N'add', N'asset', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (51, N'edit', N'asset', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (52, N'delete', N'asset', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (53, N'list', N'assetGroup', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (54, N'view', N'assetGroup', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (55, N'add', N'assetGroup', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (56, N'edit', N'assetGroup', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (57, N'delete', N'assetGroup', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (58, N'list', N'assetType', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (59, N'view', N'assetType', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (60, N'add', N'assetType', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (61, N'edit', N'assetType', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (62, N'delete', N'assetType', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (63, N'list', N'plan', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (64, N'view', N'plan', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (65, N'add', N'plan', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (66, N'edit', N'plan', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (67, N'delete', N'plan', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (68, N'list', N'uom', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (69, N'view', N'uom', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (70, N'add', N'uom', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (71, N'edit', N'uom', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (72, N'delete', N'uom', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (73, N'list', N'company', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (74, N'view', N'company', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (75, N'list', N'project', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (76, N'view', N'project', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (77, N'view', N'department', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (78, N'add', N'department', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (79, N'edit', N'department', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (80, N'delete', N'department', 2, N'root', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10077, N'add', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10078, N'edit', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10079, N'delete', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10080, N'assign', N'project', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10081, N'add', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10082, N'edit', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10083, N'delete', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (10084, N'assign', N'plan', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20077, N'list', N'department', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20078, N'view', N'department', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20079, N'add', N'department', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20080, N'edit', N'department', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20081, N'delete', N'department', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20082, N'list', N'workflow', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20083, N'view', N'workflow', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20084, N'add', N'workflow', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20085, N'edit', N'workflow', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20086, N'delete', N'workflow', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20087, N'list', N'dependency', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20088, N'view', N'dependency', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20089, N'add', N'dependency', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20090, N'edit', N'dependency', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20091, N'delete', N'dependency', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20092, N'list', N'workflow', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20093, N'view', N'workflow', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20094, N'add', N'workflow', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20095, N'edit', N'workflow', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (20096, N'delete', N'workflow', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30077, N'list', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30078, N'view', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30079, N'add', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30080, N'edit', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30081, N'delete', N'role', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30082, N'list', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30083, N'view', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30084, N'add', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30085, N'edit', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30086, N'delete', N'user', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30087, N'list', N'activity', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30088, N'view', N'activity', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30089, N'add', N'activity', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30090, N'edit', N'activity', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30091, N'delete', N'activity', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30092, N'list', N'activityResource', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30093, N'view', N'activityResource', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30094, N'add', N'activityResource', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30095, N'edit', N'activityResource', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30096, N'delete', N'activityResource', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30097, N'add', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30098, N'edit', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30099, N'delete', N'asset', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30100, N'add', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30101, N'edit', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30102, N'delete', N'assetGroup', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30103, N'add', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30104, N'edit', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30105, N'delete', N'assetType', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30106, N'add', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30107, N'edit', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30108, N'delete', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30109, N'assign', N'company', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30110, N'add', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30111, N'edit', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30112, N'delete', N'department', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30113, N'list', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30114, N'view', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30115, N'add', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30116, N'edit', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30117, N'delete', N'applicationLog', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30118, N'add', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30119, N'edit', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30120, N'delete', N'uom', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30121, N'list', N'role', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30122, N'view', N'role', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30123, N'add', N'role', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30124, N'edit', N'role', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30125, N'delete', N'role', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30126, N'list', N'user', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30127, N'view', N'user', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30128, N'add', N'user', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30129, N'edit', N'user', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30130, N'delete', N'user', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30131, N'list', N'activity', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30132, N'view', N'activity', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30133, N'add', N'activity', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30134, N'edit', N'activity', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30135, N'delete', N'activity', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30136, N'list', N'activityResource', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30137, N'view', N'activityResource', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30138, N'add', N'activityResource', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30139, N'edit', N'activityResource', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30140, N'delete', N'activityResource', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30141, N'add', N'company', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30142, N'edit', N'company', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30143, N'delete', N'company', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30144, N'assign', N'company', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30145, N'list', N'applicationLog', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30146, N'view', N'applicationLog', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30147, N'add', N'applicationLog', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30148, N'edit', N'applicationLog', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30149, N'delete', N'applicationLog', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30150, N'list', N'dependency', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30151, N'view', N'dependency', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30152, N'add', N'dependency', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30153, N'edit', N'dependency', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30154, N'delete', N'dependency', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30155, N'assign', N'plan', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30156, N'add', N'project', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30157, N'edit', N'project', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30158, N'delete', N'project', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30159, N'assign', N'project', 5, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30160, N'list', N'nameMaster', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30161, N'view', N'nameMaster', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30162, N'add', N'nameMaster', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30163, N'edit', N'nameMaster', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30164, N'delete', N'nameMaster', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30165, N'list', N'mouza', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30166, N'view', N'mouza', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30167, N'add', N'mouza', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30168, N'edit', N'mouza', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30169, N'delete', N'mouza', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30170, N'list', N'rsDaag', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30171, N'view', N'rsDaag', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30172, N'add', N'rsDaag', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30173, N'edit', N'rsDaag', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30174, N'delete', N'rsDaag', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30175, N'list', N'mouza', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30176, N'view', N'mouza', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30177, N'add', N'mouza', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30178, N'edit', N'mouza', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30179, N'delete', N'mouza', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30180, N'list', N'nameMaster', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30181, N'view', N'nameMaster', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30182, N'add', N'nameMaster', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30183, N'edit', N'nameMaster', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30184, N'delete', N'nameMaster', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30185, N'list', N'rsDaag', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30186, N'view', N'rsDaag', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30187, N'add', N'rsDaag', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30188, N'edit', N'rsDaag', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30189, N'delete', N'rsDaag', 3, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30190, N'list', N'role', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30191, N'view', N'role', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30192, N'add', N'role', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30193, N'edit', N'role', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30194, N'delete', N'role', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30195, N'list', N'user', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30196, N'view', N'user', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30197, N'add', N'user', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30198, N'edit', N'user', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30199, N'delete', N'user', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30200, N'list', N'activity', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30201, N'view', N'activity', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30202, N'add', N'activity', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30203, N'edit', N'activity', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30204, N'delete', N'activity', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30205, N'list', N'activityResource', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30206, N'view', N'activityResource', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30207, N'add', N'activityResource', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30208, N'edit', N'activityResource', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30209, N'delete', N'activityResource', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30210, N'list', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30211, N'view', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30212, N'add', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30213, N'edit', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30214, N'delete', N'asset', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30215, N'list', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30216, N'view', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30217, N'add', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30218, N'edit', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30219, N'delete', N'assetGroup', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30220, N'list', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30221, N'view', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30222, N'add', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30223, N'edit', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30224, N'delete', N'assetType', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30225, N'list', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30226, N'view', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30227, N'add', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30228, N'edit', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30229, N'delete', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30230, N'assign', N'company', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30231, N'list', N'contractor', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30232, N'view', N'contractor', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30233, N'add', N'contractor', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30234, N'edit', N'contractor', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30235, N'delete', N'contractor', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30236, N'list', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30237, N'view', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30238, N'add', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30239, N'edit', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30240, N'delete', N'department', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30241, N'list', N'dependency', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30242, N'view', N'dependency', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30243, N'add', N'dependency', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30244, N'edit', N'dependency', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30245, N'delete', N'dependency', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30246, N'list', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30247, N'view', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30248, N'add', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30249, N'edit', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30250, N'delete', N'applicationLog', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30251, N'list', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30252, N'view', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30253, N'add', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30254, N'edit', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30255, N'delete', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30256, N'assign', N'plan', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30257, N'list', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30258, N'view', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30259, N'add', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30260, N'edit', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30261, N'delete', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30262, N'assign', N'project', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30263, N'list', N'room', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30264, N'view', N'room', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30265, N'add', N'room', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30266, N'edit', N'room', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30267, N'delete', N'room', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30268, N'list', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30269, N'view', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30270, N'add', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30271, N'edit', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30272, N'delete', N'uom', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30273, N'list', N'wonership', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30274, N'view', N'wonership', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30275, N'add', N'wonership', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30276, N'edit', N'wonership', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30277, N'delete', N'wonership', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30278, N'list', N'workflow', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30279, N'view', N'workflow', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30280, N'add', N'workflow', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30281, N'edit', N'workflow', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Privileges] ([Id], [Name], [Module], [RoleId], [Member], [Key]) VALUES (30282, N'delete', N'workflow', 4, N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Privileges] OFF
GO
SET IDENTITY_INSERT [dbo].[Projects] ON 
GO
INSERT [dbo].[Projects] ([Id], [Code], [StartFinYear], [BelongTo], [Zone], [Address1], [Address2], [Address3], [Country], [City], [PinCode], [Latitude], [Longitude], [PhoneNumber], [ContactName], [Status], [State], [ApprovalStatus], [BudgetAmount], [TotalCost], [PlanStartDate], [PlanEndDate], [CompletionCertificateDate], [ParentId], [CompanyId], [Name], [Date], [Member], [Key], [BudgetAllocationAmount], [CompanyName], [WorkflowState], [ParentName]) VALUES (1, N'PROJ_01', N'2024', N'1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, CAST(0.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(N'2024-09-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-25T00:00:00.0000000' AS DateTime2), CAST(N'2024-12-16T00:00:00.0000000' AS DateTime2), NULL, 1, N'Project 1', CAST(N'2024-09-29T12:08:22.3628924' AS DateTime2), N'super@rajwada.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', CAST(0.00 AS Decimal(18, 2)), N'Rajwara', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Projects] OFF
GO
SET IDENTITY_INSERT [dbo].[Uoms] ON 
GO
INSERT [dbo].[Uoms] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (1, N'B_01', N'Bag', 0, CAST(N'2024-09-15T08:43:54.2783679' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
INSERT [dbo].[Uoms] ([Id], [Code], [Name], [Status], [Date], [Member], [Key]) VALUES (2, N'S_01', N'Sack', 0, CAST(N'2024-09-19T17:43:48.5042960' AS DateTime2), N'a.bose@example.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4')
GO
SET IDENTITY_INSERT [dbo].[Uoms] OFF
GO
SET IDENTITY_INSERT [dbo].[Workflows] ON 
GO
INSERT [dbo].[Workflows] ([Id], [Code], [Status], [Data], [Name], [Date], [Member], [Key], [Type], [ProjectId], [ProjectName], [FlatId], [FloorId], [TowerId]) VALUES (1, N'DT1', 1, N'{"nodes":[{"id":"node_0","node":{"data":{"label":"Hacking"},"type":"customNode","color":"#95FFCE"},"position":{"x":130,"y":41.25},"type":"customNode","data":{"label":"Hacking"},"style":{"background":"#95FFCE","borderRadius":"25px"},"width":150,"height":50,"selected":false,"dragging":false,"positionAbsolute":{"x":130,"y":41.25}},{"id":"node_1","node":{"data":{"label":"Brick Work"},"type":"customNode","color":"#BCFFFF"},"position":{"x":145,"y":150.25},"type":"customNode","data":{"label":"Brick Work"},"style":{"background":"#BCFFFF","borderRadius":"25px"},"width":150,"height":50,"selected":false,"positionAbsolute":{"x":145,"y":150.25},"dragging":false},{"id":"node_2","node":{"data":{"label":"Wooden Work"},"type":"customNode","color":"#FFFFBB"},"position":{"x":464,"y":125.25},"type":"customNode","data":{"label":"Wooden Work"},"style":{"background":"#FFFFBB","borderRadius":"25px"},"width":150,"height":50,"positionAbsolute":{"x":464,"y":125.25}}],"edges":[{"source":"node_0","sourceHandle":"c","target":"node_1","targetHandle":"b","markerEnd":{"type":"arrowclosed","width":20,"height":20,"color":"#2f303d"},"style":{"strokeWidth":2,"stroke":"#2f303d"},"id":"reactflow__edge-node_0c-node_1b"}],"viewport":{"x":0,"y":0,"zoom":1}}', N'Dependency Test1', CAST(N'2024-12-14T17:21:52.2700543' AS DateTime2), N'a.bose@test.com', N'1536B022-C5C9-4358-BB6A-466F2075B7D4', N'Inside', 1, NULL, NULL, NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[Workflows] OFF
GO
ALTER TABLE [dbo].[Dependencies] ADD  DEFAULT (N'') FOR [Type]
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
ALTER TABLE [dbo].[NameMasters]  WITH CHECK ADD  CONSTRAINT [FK_NameMasters_Mouzas_MouzaId] FOREIGN KEY([MouzaId])
REFERENCES [dbo].[Mouzas] ([Id])
GO
ALTER TABLE [dbo].[NameMasters] CHECK CONSTRAINT [FK_NameMasters_Mouzas_MouzaId]
GO
ALTER TABLE [dbo].[NameMasters]  WITH CHECK ADD  CONSTRAINT [FK_NameMasters_RsDaags_RsDaagId] FOREIGN KEY([RsDaagId])
REFERENCES [dbo].[RsDaags] ([Id])
GO
ALTER TABLE [dbo].[NameMasters] CHECK CONSTRAINT [FK_NameMasters_RsDaags_RsDaagId]
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
ALTER TABLE [dbo].[RsDaags]  WITH CHECK ADD  CONSTRAINT [FK_RsDaags_Mouzas_MouzaId] FOREIGN KEY([MouzaId])
REFERENCES [dbo].[Mouzas] ([Id])
GO
ALTER TABLE [dbo].[RsDaags] CHECK CONSTRAINT [FK_RsDaags_Mouzas_MouzaId]
GO
ALTER TABLE [dbo].[Workflows]  WITH CHECK ADD  CONSTRAINT [FK_Workflows_Plans_FlatId] FOREIGN KEY([FlatId])
REFERENCES [dbo].[Plans] ([Id])
GO
ALTER TABLE [dbo].[Workflows] CHECK CONSTRAINT [FK_Workflows_Plans_FlatId]
GO
ALTER TABLE [dbo].[Workflows]  WITH CHECK ADD  CONSTRAINT [FK_Workflows_Plans_FloorId] FOREIGN KEY([FloorId])
REFERENCES [dbo].[Plans] ([Id])
GO
ALTER TABLE [dbo].[Workflows] CHECK CONSTRAINT [FK_Workflows_Plans_FloorId]
GO
ALTER TABLE [dbo].[Workflows]  WITH CHECK ADD  CONSTRAINT [FK_Workflows_Plans_TowerId] FOREIGN KEY([TowerId])
REFERENCES [dbo].[Plans] ([Id])
GO
ALTER TABLE [dbo].[Workflows] CHECK CONSTRAINT [FK_Workflows_Plans_TowerId]
GO
ALTER TABLE [dbo].[Workflows]  WITH CHECK ADD  CONSTRAINT [FK_Workflows_Projects_ProjectId] FOREIGN KEY([ProjectId])
REFERENCES [dbo].[Projects] ([Id])
GO
ALTER TABLE [dbo].[Workflows] CHECK CONSTRAINT [FK_Workflows_Projects_ProjectId]
GO
