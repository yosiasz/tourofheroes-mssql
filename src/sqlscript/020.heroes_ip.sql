USE [heroes]
GO

create proc [dbo].[heroes_ip]
(
	@name nvarchar(150) 
)
AS
	;with src
	as
	(
	select @name as name
	)

    INSERT INTO [dbo].heroes
			   (name)
    select name
	  from src
	where not exists(select 1 from heroes tgt where tgt.name = src.name)
GO
grant execute on [heroes_ip] to heroes
go



