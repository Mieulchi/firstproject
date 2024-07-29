{{>layouts/header}}

<table class="table">
    <thead>
    <tr>
        <th scope="col">Id</th>
        <th scope="col">Title</th>
        <th scope="col">Content</th>
    </tr>
    </thead>
    <tbody>
    {{#articleList}}
        <tr>
            <th>{{id}}</th>
            <td><a href="/articles/{{id}}">{{title}}</a></td>
            <td>{{content}}</td>
        </tr>
    {{/articleList}}
    </tbody>
</table>
<a href="/articles/new">New Article</a>

{{>layouts/footer}}
