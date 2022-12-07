function whitepaperBackup(params){
var whitepapersList = api.whitepaper.list().results;
var rightNow = new Date();
var date = rightNow.toISOString().slice(0,10).replace(/-/g,"");

api.file.create_folder("cloudflow://PP_FILE_STORE/", "backup");
api.file.create_folder("cloudflow://PP_FILE_STORE/", "tmp");
api.file.create_folder("cloudflow://PP_FILE_STORE/tmp/", "whitepapers");

for(i=0; i<whitepapersList.length; i++){
   var whitepaper = api.whitepaper.download(whitepapersList[i]._id);
   console.log(whitepaper.name);
   api.file.text.write(whitepaper.contents, "cloudflow://PP_FILE_STORE/tmp/whitepapers/"+whitepaper.name, {
    overwrite: true, 
   file_encoding: "UTF8"
   })

}

api.file.copy_folder("cloudflow://web/", "cloudflow://PP_FILE_STORE/tmp/", {
    overwrite_mode: "MergeTreeAndReplaceFiles",
    create_folders: true
})

api.archive.zip_files("cloudflow://PP_FILE_STORE/backup/", date+"_backup.zip", "cloudflow://PP_FILE_STORE/tmp/", {
    overwrite:true
})
if(params[0] === true){
var fileUrl = api.portal.get_url().external_url + "portal.cgi?asset=cloudflow%3A%2F%2FPP_FILE_STORE%2Fbackup%2F" + date + "_backup.zip"
var subject = 'Backup de flujos de trabajo realizado con éxito';
var body = `Estimado usuario.<br>
Su correo <strong>${params[1]}</strong> ha sido registrado para recibir las notificaciones de respaldo de flujos de trabajo de nuestro sistema Cloudflow. A continuación le entregamos los detalles del respaldo:<br>
<strong>Fecha de respaldo:</strong> ${rightNow}<br>
<strong>Nombre del archivo:</strong> ${date}_backup.zip<br>
<strong>URL en Cloudflow:</strong> <a href="${fileUrl}" target="_blank">Clic aquí</a> para descargar<br>
<br>
Este archivo tendrá ${params[2]} días de duración en el sistema por lo que es recomendable que se resguarde en su propiedad o en un lugar seguro.
<br>
<br>
<hr>
<small>Este mensaje ha sido enviado desde un sistema automático, por favor no responder.</small>`;
api.email.send_mail(params[1], subject, body);
}
var current = Date.now();
var expireDate = new Date(current + (params[2]*86400000));
expireDate.toLocaleDateString();
var data = {
birth: rightNow,
expire: expireDate,
fileUrl: "cloudflow://PP_FILE_STORE/backup/"+date+"_backup.zip",
}
api.custom_objects.create("backupManager", data)
}