USE [heroes]
GO

create proc [dbo].[heroes_ip]
(
	@newheroe heroesType readonly 
)
AS
    INSERT INTO [dbo].heroes
			   (name)
    select name
	  from @newheroe src
	where not exists(select 1 from heroes tgt where tgt.name = src.name)
GO



