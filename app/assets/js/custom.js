$(document).ready(function () {
    // init validator
    $.validator.setDefaults({
        debug: true,
        success: "valid"
    });

    // validate forms
    $("#planSelectForm").validate();
    $("#memberDetailsForm").validate();
    $("#additionsForm").validate();
    $("#checkOutForm").validate();

    $('.custom-error').hide();
    $('#planSelectForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid() == true) {
            nextFrom(); // switch to next form
            $('.error').text('')
        } 
        $('.error').text('Please Select an Option.')
        $('.valid').text('')
        
    })

    $('#memberDetailsForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            console.log('valid');
            nextFrom(); // switch to next form
        } else {
            // showAlert();
        }
    })

    $('#additionsForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            console.log('valid');
            nextFrom(); // switch to next form
        } else {
            // showAlert();
        }
    })

    $('#checkOutForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            console.log('valid');
            nextFrom(); // switch to next form
        } else {
            // showAlert();
        }
    })

    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    // $(".next-step").click(function (e) {
    //     var $active = $('.wizard .nav-tabs li.active');
    //     $active.removeClass('active').addClass('disabled');
    //     $active.next().removeClass('disabled').addClass('active');
    //     nextTab($active);
    // });
    // $(".prev-step").click(function (e) {
    //     var $active = $('.wizard .nav-tabs li.active');
    //     $active.removeClass('active').addClass('disabled');
    //     $active.prev().removeClass('disabled').addClass('active');
    //     prevTab($active);

    // });

    $('.mannual-address').hide();
    // switch address forms 
    // show mannual address form
    $('#showMannualAddressForm').on('click',function(){
        $('.google-address').hide();
        $('.mannual-address').show();
    })
    // show google address form
    $('#showGoogleAddressForm').on('click',function(){
        $('.mannual-address').hide();
        $('.google-address').show();
    })

    // show hide family members form
    $('.familyMembersForm').hide();
    $('#addFamilyMembers').on('click',function(){
        $('.familyMembersForm').show();
        $('#addFamilyMembers').hide();
    })
    $('#hideFamilyMembersForm').on('click',function(){
        $('.familyMembersForm').hide();
        $('#addFamilyMembers').show();
    })

    // sidebar
    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    // disable radio buttons
    // $('#planSelectForm .form-group:first-child')
    
    // change form icons and summary on radio select
    $('#planSelectForm input[type=radio]').on('change',function(){
        var prevRadio = $(this).closest('.form-group').prevAll('.form-group').find('input[type=radio]').is(':checked');
        if(prevRadio == false){
            // prevRadio.attr(':checked',false);
            var msg = 'Please Select Previous Value';
            showSnackbar(msg)
            return false
        }
        switch($(this).attr('name')){
            case  'membership' :
            $('#membership-td').next('td').html('<strong>'+$(this).val()+'</strong>');
            $('#membership-td').prev('td').addClass('active-icon');
            $('input[name=membership]').closest('.form-group').find('.form-check-icon').addClass('active-icon');
            break;
            case  'type' :
            $('#type-td').next('td').html('<strong>'+$(this).val()+'</strong>');
            $('#type-td').prev('td').addClass('active-icon');
            $('input[name=type]').closest('.form-group').find('.form-check-icon').addClass('active-icon');
            break;
            case  'term' :
            $('#term-td').next('td').html('<strong>'+$(this).val()+'</strong>');
            $('#term-td').prev('td').addClass('active-icon');
            $('input[name=term]').closest('.form-group').find('.form-check-icon').addClass('active-icon');
            break;
            case  'maxTripLength' :
            $('#maxTripLength-td').next('td').html('<strong>'+$(this).val()+'</strong>');
            $('#maxTripLength-td').prev('td').addClass('active-icon');
            $('input[name=maxTripLength]').closest('.form-group').find('.form-check-icon').addClass('active-icon');
            break;

        }
    })
    
});

function nextFrom() {
    var $active = $('.wizard .nav-tabs li.active');
    $active.removeClass('active').addClass('disabled');
    $active.find('a').prepend('<i class="fas fa-check text-white mr-2"></i>');
    $active.next().removeClass('disabled').addClass('active');
    nextTab($active);
}

function prevForm() {
    var $active = $('.wizard .nav-tabs li.active');
    $active.removeClass('active').addClass('disabled');
    $active.prev().removeClass('disabled').addClass('active');
    prevTab($active);
}

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

// show snackbar
function showSnackbar(msg) {
    $('#snackbar').addClass('show').text(msg);
    setTimeout(function(){ $('#snackbar').removeClass('show'); }, 3000);
}