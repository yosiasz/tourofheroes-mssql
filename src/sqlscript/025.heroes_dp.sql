USE [heroes]
GO

create proc [dbo].[heroes_dp]
(
	@id int
)
AS
    delete from heroes 
	 where id = @id	
GO

grant execute on [heroes_dp] to heroes
go


