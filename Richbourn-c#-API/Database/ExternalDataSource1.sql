CREATE EXTERNAL DATA SOURCE [ExternalDataSource1] WITH
(  
	TYPE = SHARD_MAP_MANAGER,
	LOCATION = 'myserver.database.windows.net',
	DATABASE_NAME = 'myshardmapdb',
	SHARD_MAP_NAME = 'myshardmap',
	CREDENTIAL = [mycredential]	
)