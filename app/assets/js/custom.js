
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
            $('.error').text('');
        } else {
            showSnackbar('Please Select All Required Options');
        }
        $('.error').text('Please Select an Option.');
        $('.valid').text('');
        
    })

    $('#memberDetailsForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            console.log('valid');
            nextFrom(); // switch to next form
        } else {
            showSnackbar('Please Fill All Required Fields');
        }
    });

    $('#additionsForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            console.log('valid');
            nextFrom(); // switch to next form
        } else {
            showSnackbar('Please Fill All Required Fields');
        }
    });

    $('#checkOutForm').on('submit', function (e) {
        e.preventDefault();
        if ($(this).valid()) {
            console.log('valid');
            nextFrom(); // switch to next form
        } else {
            showSnackbar('Please Fill All Required Fields');
        }
    });

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
    });
    // show google address form
    $('#showGoogleAddressForm').on('click',function(){
        $('.mannual-address').hide();
        $('.google-address').show();
    });

    // show hide family members form
    $('.familyMembersForm').hide();
    $('#addFamilyMembers').on('click',function(){
        $('.familyMembersForm').show();
        $('#addFamilyMembers').hide();
    });
    $('#hideFamilyMembersForm').on('click',function(){
        $('.familyMembersForm').hide();
        $('#addFamilyMembers').show();
    });

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
    
    var data = {
        activeClass: '',
        items: {
            membership: {title:'Membership', value: 'Not Selected'},
            type : {title:'Type', value : 'Not Selected'},
            term : {title:'Term', value: 'Not Selected'},
            maxTripLength: {title:'Max Trip Lingth', value: 'Not Selected'}
        },
        totalMembershipAmount : '0.00'
    };

    var membershipAmount = 0;
    // change form icons and summary on radio select
    $('#planSelectForm input[type=radio]').on('change',function(){
        switch($(this).attr('name')){
            case  'membership' :
            data.items.membership.value = $(this).val();// add checked radio value to summary
            $('#membership-td').prev('td').addClass('active-icon'); // change selected item icon color 
            $('input[name=membership]').closest('.form-group').find('.form-check-icon').addClass('active-icon'); // add active class to section icon
            $('input[name=membership]').closest('.form-group').removeClass('form-group-error'); // remove error class from form-group
            break;
            case  'type' :
            // check if previous radio is checked
            if($('input[name=membership]').is(':checked') == false){
                $('.type-radio input[type=radio]').prop('checked', false);
                showSnackbar('Please Select MemberShip'); // show snackbar alert
                $('input[name=membership]').closest('.form-group').addClass('form-group-error'); // add error class to previous formgroup
                return false;
            }
            data.items.type.value = $(this).val();// add checked radio value to summary
            $('#type-td').prev('td').addClass('active-icon'); // change selected item icon color
            $('input[name=type]').closest('.form-group').find('.form-check-icon').addClass('active-icon'); // add active class to section icon
            $('input[name=type]').closest('.form-group').removeClass('form-group-error'); // remove error class from form-group
            break;
            case  'term' :
            // check if previous radio is checked
            if($('input[name=type]').is(':checked') == false){
                $('.term-radio input[type=radio]').prop('checked', false);
                showSnackbar('Please Select Type'); // show snackbar alert
                $('input[name=type]').closest('.form-group').addClass('form-group-error'); // add error class to previous formgroup
                return false;
            }
            data.items.term.value = $(this).val();// add checked radio value to summary
            $('#term-td').prev('td').addClass('active-icon'); // change selected item icon color
            $('input[name=term]').closest('.form-group').find('.form-check-icon').addClass('active-icon'); // add active class to section icon
            $('input[name=term]').closest('.form-group').removeClass('form-group-error'); // remove error class from form-group
            break;
            case  'maxTripLength' :
            // check if previous radio is checked
            if($('input[name=term]').is(':checked') == false){
                $('.maxTripLength-radio input[type=radio]').prop('checked', false);
                showSnackbar('Please Select Term');  // show snackbar alert
                $('input[name=term]').closest('.form-group').addClass('form-group-error'); // add error class to previous formgroup
                return false;
            }
            data.items.maxTripLength.value = $(this).val();// add checked radio value to summary
            $('#maxTripLength-td').prev('td').addClass('active-icon'); // change selected item icon color
            $('input[name=maxTripLength]').closest('.form-group').find('.form-check-icon').addClass('active-icon'); // add active class to section icon
            break;
        }
        summaryTemplate(data);
    })
    summaryTemplate(data);
});

function nextFrom() {
    var $active = $('.wizard .nav-tabs li.active');
    $active.find('a .fas').remove();
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

function summaryTemplate(data){
    var data = data;
    var template = `
    <h4 class="mb-2">Summary</h4>
                  <div class="dropdown-divider"></div>
                  <table class="table-sm mt-2 mb-4">
                    <tr>
                      <td>
                        <i class="fas fa-check"></i>
                      </td>
                      <td id="{{items.membership.title}}-td">{{items.membership.title}}</td>
                      <td>
                        <strong>{{items.membership.value}}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="fas fa-check"></i>
                      </td>
                      <td id="{{items.type.title}}-td">{{items.type.title}}</td>
                      <td>
                      <strong>{{items.type.value}}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="fas fa-check"></i>
                      </td>
                      <td id="{{items.term.title}}-td">{{items.term.title}}</td>
                      <td>
                      <strong>{{items.term.value}}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="fas fa-check"></i>
                      </td>
                      <td id="{{items.maxTripLength.title}}-td">{{items.maxTripLength.title}}</td>
                      <td>
                      <strong>{{items.maxTripLength.value}}</strong>
                      </td>
                    </tr>
                  </table>
                  <div class="dropdown-divider"></div>
                  <div class="d-flex align-items-center justify-content-between my-3">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" class="option-input checkbox"> Auto Renew
                      </label>
                    </div>
                    <i class="fas fa-question-circle active-icon"></i>
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="my-2">
                    <h5>Membership</h5>
                    <h4>$ {{totalMembershipAmount}}</h4>
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="my-2">
                    <h5>Grand Total</h5>
                    <h4>$ 0.00</h4>
                  </div>
    `;
    var html = Mustache.to_html(template,data);
    $('#summary').html(html)
}
