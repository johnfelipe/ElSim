function fillContent(id) {
    let content = '<ul class="list-group"> ';
    const F = new Intl.NumberFormat('es-ES');
    $.get('/results/' + id, function (data, status) {

        content += '<li class="list-group-item"><span class="fa fa-user"></span> ' + data.data.election.author + '</li>';
        content += '<li class="list-group-item"><span class="fa fa-calendar"></span> ' + moment(data.data.election.date).format('DD/MM/YYYY') + '</li>';
        content += '<li class="list-group-item"><span class="fa fa-map-o"></span> ' + data.data.community + '</li>';
        content += '<li class="list-group-item"><span class="fa fa-map-marker"></span> ' + data.data.province + '(' + data.data.cod_province + ')</li>';
        content += '<li class="list-group-item"><span class="fa fa-group"></span> ' + F.format(data.data.population) + ' total population </li>';
        content += '<li class="list-group-item"><span class="fa fa-group"></span> ' + F.format(data.data.total_voters) + ' voters</li>';
        content += '<li class="list-group-item"><span class="fa fa-check-circle-o"></span> ' + F.format(data.data.valid_votes) + ' valid votes</li>';
        content += '<li class="list-group-item"><span class="fa fa-envelope"></span> ' + F.format(data.data.votes_to_parties) + ' parties votes</li>';
        content += '<li class="list-group-item"><span class="fa fa-envelope-o"></span> ' + F.format(data.data.blank_votes) + ' blank votes</li>';
        content += '<li class="list-group-item"><span class="fa fa-times-circle-o"></span> ' + F.format(data.data.null_votes) + ' null votes</li>';
        content += '</ul>';
        content += '<br><h4><span class="fa fa-envelope-open-o"></span> Votes:</h4><hr>';
        content += '<ul class="list-group">';

        let keys = Object.keys(data.data.parties);
        for(let key of keys){
            content += '<li class="list-group-item">' + key +': ' + F.format(data.data.parties[key]) + '</li>';
        }
        content += '</ul>';

        $('#content').empty().append(content + '');
        $("html, body").animate({scrollTop: 0}, "slow");
    });

}