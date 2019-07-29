--heroes database needs to be created on your SQL Server
use heroes
go

if exists(select 1 from sys.procedures where name = 'heroes_sp')
begin
	drop proc dbo.heroes_sp;
end
go

create proc dbo.heroes_sp
(
    @id int = null
)
AS
select id,
       name
  from dbo.vw_heroes    
  where (@id is null or id = @id)
go

grant execute on dbo.heroes_sp to heroes;