create procedure guardarpersona
@nombre varchar(40), @edad int 
as 
insert into persona(nombre,edad)
values (@nombre,@edad)

create procedure actualizarpersona
@nombre varchar(40), @edad int ,@id int
as
update persona set nombre=@nombre,edad=@edad where id =@id

create procedure eliminarpersona
@id int
as
delete persona where id =@id