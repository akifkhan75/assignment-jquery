
var template, data, html;

$(document).ready(function(){
    topNav();
    sideBar();
    footerTemplate();
})

function topNav(){
    data = {
        items: ['About','Media','Contact','Login']
    }

    template = `
        {{#items}}
            <li class="nav-item">
                <a class="nav-link" href="#">{{.}}
                    <span class="sr-only">(current)</span>
                </a>
            </li>
        {{/items}}
    `;
    html = Mustache.to_html(template,data);
    $('#topMenu').html(html)
} //

function sideBar(){
    data = {
        items: ['personal memberships','Enterprise','Partnerships']
    }

    template = `
        <div class="d-flex justify-content-end">
        <div id="dismiss">
          <i class="fas fa-arrow-left"></i>
        </div>
      </div>
      <ul class="nav flex-column">
      {{#items}}
        <li class="nav-item">
          <a class="nav-link active text-uppercase" href="#">
            {{.}}
          </a>
        </li>
        {{/items}}
      </ul>
    `;
    html = Mustache.to_html(template,data);
    $('#sidebar').html(html)
} //

function footerTemplate(){
    data = {
        dummyText: 'Footer Contents'
    }

    template = `
    <div class="container text-center">
        {{dummyText}}
    </div>
    `;
    html = Mustache.to_html(template,data);
    $('footer').html(html)
} //