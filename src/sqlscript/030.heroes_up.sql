USE [heroes]
GO

create proc [dbo].[heroes_up]
(
	@herotype heroType readonly 
)
AS
    update tgt
	   set tgt.name = src.name
	  from dbo.heroes tgt
	  join @herotype src on tgt.id = src.id
GO

grant execute on [heroes_up] to heroes
go
