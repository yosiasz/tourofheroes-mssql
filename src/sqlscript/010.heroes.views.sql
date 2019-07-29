use heroes
go

if exists(select 1 from sys.views where name = 'vw_heroes')
begin
	drop view dbo.vw_heroes;
end
go

create view dbo.vw_heroes
AS
select id,
       name
  from dbo.heroes    
go