<div class="card m-2" id="comments-new">
    <div class="card-body">
        <!--댇글작썽폼-->
        <form>
            <!--닝내임-->
            <div class="mb-3">
                <label class="form-label">Nickname</label>
                <input type="text" class="form-control" id="new-comment-nickname">
            </div>

            <!--내용-->
            <div class="mb-3">
                <label class="form-label">Content</label>
                <textarea type="text" rows="3" class="form-control" id="new-comment-body"></textarea>
            </div>

            <!--hidden input-->
            {{#article}}
                <input type="hidden" id="new-content-article-id" value="{{id}}">
            {{/article}}

            <!--등록-->
            <button type="button" class="btn btn-primary"
            id="comment-create-btn">댓글 작성</button>
        </form>
    </div>
</div>

<script>
    const commentCreateBtn = document.querySelector("#comment-create-btn");

    commentCreateBtn.addEventListener("click", function() {
        var comment = {
            nickname : document.querySelector("#new-comment-nickname").value,
            body : document.querySelector("#new-comment-body").value,
            articleId : document.querySelector("#new-content-article-id").value
        };

        const url = "/api/articles/" + comment.articleId + "/comments";
        fetch(url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(comment)
        }).then(response => {
            const msg = (response.ok) ? "댓글이 등록되었습니다." : "댓글 등록 실패..";
            alert(msg);

            window.location.reload();
        });
    });


</script>