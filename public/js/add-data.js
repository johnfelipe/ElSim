function parseFields(done) {
    $('#cod_provinceSpan').text($('#province').val());
    $('#populationSpan').text($('#population').val());
    $('#total_votersSpan').text($('#voters').val());
    $('#valid_votesSpan').text();
    $('#blank_votesSpan').text($('#blanks').val());
    $('#votes_nuloSpan').text($('#nulls').val());
    $('#electionSpan1').text('author: ' + $('#author').val());
    $('#electionSpan2').text('date: ' + fixDate($('#date').val()));
    done();
}

function fixDate(date) {
    if (date !== undefined) {
        let fixed = date.toString();
        fixed = fixed.substring(5, 7) + '/' + fixed.substring(0, 4);
        return fixed;
    } else {
        return '10/2016';
    }
}

function calculateCandidatureVotes() {
    return +$('#valid_votesSpan').text() - +$('#blank_votesSpan').text();
}

function processTextarea() {
    let partiesSpan = $('#partiesSpan');

    let lines = $('#votes').val().split('\n');

    partiesSpan.text('[');

    let total = 0;

    for (let i = 0, len = lines.length; i < len; i++) {
        if (i > 0) partiesSpan.text(partiesSpan.text() + ', ' + lines[i]);
        else partiesSpan.text(partiesSpan.text() + ' ' + lines[i]);
        total += +lines[i].split(' ')[2];
    }

    partiesSpan.text(partiesSpan.text() + ']');

    let n = (+$('#blank_votesSpan').text()) + (+$('#votes_nuloSpan').text());

    n = n + total;

    $('#valid_votesSpan').text(n);

    $('#votes_to_partiesSpan').text(calculateCandidatureVotes());
}
