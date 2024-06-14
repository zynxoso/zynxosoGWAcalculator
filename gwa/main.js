$(document).ready(function() {
    $('#addSubject').click(function() {
        addSubjectField();
    });

    $('#subjects').on('click', '.remove-btn', function() {
        $(this).closest('.subject').remove();
    });

    $('#calculateGwa').click(function() {
        calculateGwa();
    });

    $('#resetForm').click(function() {
        resetForm();
    });

    function addSubjectField() {
        $('#subjects').append(`
            <div class="row mb-3 subject">
                <div class="col">
                    <input type="number" step="0.01" class="form-control grade" placeholder="Grade (1.0-5.0)" required>
                    <div class="invalid-feedback">Grade must be between 1.0 and 5.0</div>
                </div>
                <div class="col">
                    <input type="number" class="form-control unit" placeholder="Units (positive number)" required>
                    <div class="invalid-feedback">Units must be a positive number</div>
                </div>
                <div class="col-auto">
                    <span class="remove-btn">&times;</span>
                </div>
            </div>
        `);
    }

    function calculateGwa() {
        let totalUnits = 0;
        let weightedSum = 0;
        let isValid = true;

        $('.subject').each(function() {
            const gradeInput = $(this).find('.grade');
            const unitsInput = $(this).find('.unit');
            const grade = parseFloat(gradeInput.val());
            const units = parseFloat(unitsInput.val());

            if (isNaN(grade) || grade < 1.0 || grade > 5.0) {
                isValid = false;
                gradeInput.addClass('is-invalid');
                gradeInput.next('.invalid-feedback').show();
            } else {
                gradeInput.removeClass('is-invalid');
                gradeInput.next('.invalid-feedback').hide();
            }

            if (isNaN(units) || units <= 0) {
                isValid = false;
                unitsInput.addClass('is-invalid');
                unitsInput.next('.invalid-feedback').show();
            } else {
                unitsInput.removeClass('is-invalid');
                unitsInput.next('.invalid-feedback').hide();
            }

            if (isValid) {
                totalUnits += units;
                weightedSum += grade * units;
            }
        });

        if (isValid) {
            const gwa = weightedSum / totalUnits;
            $('#result').removeClass('d-none').removeClass('alert-danger').addClass('alert-info').html(`
                <strong>Calculated GWA:</strong> ${gwa.toFixed(2)}
                <br>
                <strong>Total Units:</strong> ${totalUnits}
                <br>
                <strong>Weighted Sum:</strong> ${weightedSum.toFixed(2)}
            `);
        } else {
            $('#result').removeClass('d-none').removeClass('alert-info').addClass('alert-danger').text('Please fix the highlighted errors before calculating.');
        }
    }

    function resetForm() {
        $('#gwaForm')[0].reset();
        $('#subjects').html(`
            <div class="row mb-3 subject">
                <div class="col">
                    <input type="number" step="0.01" class="form-control grade" placeholder="Grade (1.0-5.0)" required>
                    <div class="invalid-feedback">Grade must be between 1.0 and 5.0</div>
                </div>
                <div class="col">
                    <input type="number" class="form-control unit" placeholder="Units (positive number)" required>
                    <div class="invalid-feedback">Units must be a positive number</div>
                </div>
                <div class="col-auto">
                    <span class="remove-btn">&times;</span>
                </div>
            </div>
        `);
        $('#result').addClass('d-none').removeClass('alert-info alert-danger').text('');
    }
});