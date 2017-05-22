function fillContent(id) {
    console.log(id);
    let content = '<ul class="list-group"> ';
    $.get('/resultados/' + id, function (data, status) {

        content += '<li class="list-group-item"><span class="fa fa-user"></span> ' + data.data.eleccion.autor + '</li>';
        content += '<li class="list-group-item"><span class="fa fa-calendar"></span> ' + moment(data.data.eleccion.fecha).format('DD/MM/YYYY') + '</li>';
        content += '<li class="list-group-item"><span class="fa fa-map-o"></span> ' + data.data.comunidad + '</li>';
        content += '<li class="list-group-item"><span class="fa fa-map-marker"></span> ' + data.data.provincia + '(' + data.data.cod_provincia + ')</li>';
        content += '<li class="list-group-item"><span class="fa fa-group"></span> ' + data.data.poblacion + ' total population </li>';
        content += '<li class="list-group-item"><span class="fa fa-group"></span> ' + data.data.total_votantes + ' voters</li>';
        content += '<li class="list-group-item"><span class="fa fa-check-circle-o"></span> ' + data.data.votos_validos + ' valid votes</li>';
        content += '<li class="list-group-item"><span class="fa fa-envelope"></span> ' + data.data.votos_candidaturas + ' parties votes</li>';
        content += '<li class="list-group-item"><span class="fa fa-envelope-o"></span> ' + data.data.votos_blanco + ' blank votes</li>';
        content += '<li class="list-group-item"><span class="fa fa-times-circle-o"></span> ' + data.data.votos_nulos + ' null votes</li>';
        content += '</ul>'
        content += '<br><h4><span class="fa fa-envelope-open-o"></span> votes:</h4><hr>';
        content += '<ul class="list-group"><li class="list-group-item"><pre>' + JSON.stringify(data.data.partidos, undefined, 4) + '</pre></li></ul>';

        $('#content').empty().append(content + '');
        $("html, body").animate({scrollTop: 0}, "slow");
    });

}