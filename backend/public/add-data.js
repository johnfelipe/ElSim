function parseFields(done) {
    $('#cod_provinciaSpan').text($('#province').val());
    $('#poblacionSpan').text($('#population').val());
    $('#num_mesasSpan').text($('#tables').val());
    $('#total_censo_electoralSpan').text($('#census').val());
    $('#total_votantesSpan').text($('#voters').val());
    $('#votos_validosSpan').text();
    $('#votos_blancoSpan').text($('#blancos').val());
    $('#votos_nuloSpan').text($('#nulos').val());
    $('#eleccionSpan1').text('author: ' + $('#author').val());
    $('#eleccionSpan2').text('date: ' + fixDate($('#date').val()));
    done();
}

function fixDate(date) {
    if (date != undefined) {
        var fixed = date.toString();
        fixed = fixed.substring(5, 7) + '/' + fixed.substring(0, 4);
        return fixed;
    } else {
        return '10/2016';
    }
}

function calculateCandidatureVotes(){
    return +$('#votos_validosSpan').text() - +$('#votos_blancoSpan').text();
}

function processTextarea() {
    var lines = $('#votes').val().split('\n');
    $('#partidosSpan').text('[');
    var total = 0;
    for (var i = 0; i < lines.length; i++) {
        if(i > 0)  $('#partidosSpan').text($('#partidosSpan').text() + ', ' + lines[i]);
        else $('#partidosSpan').text($('#partidosSpan').text() + ' ' + lines[i]);
        total += +lines[i].split(' ')[2];
    }
    $('#partidosSpan').text($('#partidosSpan').text() + ']');
    var n = +$('#votos_blancoSpan').text() + +$('#votos_nuloSpan').text();
    n = n + total;
    $('#votos_validosSpan').text(n);
    $('#votos_candidaturasSpan').text(calculateCandidatureVotes());
}
