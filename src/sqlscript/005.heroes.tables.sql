--heroes database needs to be created on your SQL Server
use heroes
go

if exists(select 1 from master.sys.databases where name = 'heroes')
    BEGIN
        if not exists(select 1 from sys.tables where name = 'heroes')
            BEGIN
                create table heroes(id int not null identity(1,1), name nvarchar(150));

                insert into heroes
                select 'Mr. Nice'  union 
                select 'Narco'  union
                select 'Bombasto' union
                select 'Celeritas' union
                select 'Magneta' union
                select 'RubberMan' union
                select 'Dynama' union
                select 'Dr IQ' union
                select 'Magma' union
                select 'Tornado'      
            end
    end
else
	PRINT 'You need to first create a heroes database'
    go