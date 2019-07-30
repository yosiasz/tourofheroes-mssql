USE [heroes]
GO

CREATE TYPE [dbo].[heroType] AS TABLE(
	id int null,
	[name] nvarchar(150) NOT NULL
)
GO

GRANT EXEC ON TYPE::dbo.heroType  TO [heroes]
GO