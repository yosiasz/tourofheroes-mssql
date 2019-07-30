USE [heroes]
GO

create proc [dbo].[heroes_ip]
(
	@herotype heroesType readonly 
)
AS
    INSERT INTO [dbo].heroes
			   (name)
    select name
	  from @herotype src
	where not exists(select 1 from heroes tgt where tgt.name = src.name)
GO

grant execute on [heroes_ip] to heroes
go



