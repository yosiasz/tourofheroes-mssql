USE [heroes]
GO

CREATE TYPE [dbo].[heroesType] AS TABLE(
	[name] nvarchar(150) NOT NULL
)
GO

GRANT EXEC ON TYPE::dbo.heroesType  TO [heroes]
GO