use master
go

CREATE LOGIN heroes   
    WITH PASSWORD = '340$Uuxwp7Mcxo7Khy';  
GO  

use heroes
go

-- Creates a database user for the login created above.  
CREATE USER [heroes] FOR LOGIN [heroes] WITH DEFAULT_SCHEMA=[dbo]
GO

USE heroes  
GO  
EXEC sp_addrolemember N'db_datareader', N'heroes'  
GO  

USE heroes  
GO  
EXEC sp_addrolemember N'db_datawriter', N'heroes'  
GO 