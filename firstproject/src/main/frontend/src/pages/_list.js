<div id="comments-list">
    {{#commentDtos}}
        <div class="card m-2" id="comments-{{id}}">
                <div class="card-header">
                    {{nickname}}
                    <button type="button"
                            class="btn btn-sm btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#comment-edit-modal"
                            data-bs-id="{{id}}"
                            data-bs-nickname="{{nickname}}"
                            data-bs-body="{{body}}"
                            data-bs-article-id="{{articleId}}">
                        수정
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-danger comment-delete-btn"
                        data-comment-id="{{id}}">삭제</button>
                </div>
                <div class="card-body">
                    {{body}}
                </div>
        </div>
    {{/commentDtos}}
</div>


<div class="modal fade" id="comment-edit-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">댓글 수정</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <!--닝내임-->
                    <div class="mb-3">
                        <label class="form-label">Nickname</label>
                        <input type="text" class="form-control" id="edit-comment-nickname">
                    </div>

                    <!--내용-->
                    <div class="mb-3">
                        <label class="form-label">Content</label>
                        <textarea type="text" rows="3" class="form-control" id="edit-comment-body"></textarea>
                    </div>

                    <!--hidden input-->
                    <input type="hidden" id="edit-comment-id">
                    <input type="hidden" id="edit-comment-article-id">

                    <!--등록-->
                    <button type="button" class="btn btn-primary"
                            id="comment-update-btn">수정 완료</button>
                </form>
            </div>
        </div>
    </div>
</div>


<!--모달 이벤트 처리-->
<script>
    {
        const commentEditModal = document.querySelector("#comment-edit-modal");

        commentEditModal.addEventListener("show.bs.modal", function(event) {
            const triggerBtn = event.relatedTarget;

            const id = triggerBtn.getAttribute("data-bs-id");
            const nickname = triggerBtn.getAttribute("data-bs-nickname");
            const body = triggerBtn.getAttribute("data-bs-body");
            const articleId = triggerBtn.getAttribute("data-bs-article-id");

            document.querySelector("#edit-comment-nickname").value = nickname;
            document.querySelector("#edit-comment-body").value = body;
            document.querySelector("#edit-comment-id").value = id;
            document.querySelector("#edit-comment-article-id").value = articleId;
        });
    }


    {
        const commentUpdateBtn = document.querySelector("#comment-update-btn");

        commentUpdateBtn.addEventListener("click", function() {
            const comment = {
                id : document.querySelector("#edit-comment-id").value,
                article_id : document.querySelector("#edit-comment-article-id").value,
                body : document.querySelector("#edit-comment-body").value,
                nickname : document.querySelector("#edit-comment-nickname").value
            };
            const url = "/api/comments/" + comment.id;
            fetch(url, {
                method : "PATCH",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(comment)
            }).then(response => {
                const msg = (response.ok) ? "댓글이 수정되었습니다." : "댓글수정실패";
                alert(msg);

                window.location.reload();
            });
        })
    }
</script>

<!--댓글 삭제-->
<script>
    {
        const commentDeleteBtns = document.querySelectorAll(".comment-delete-btn");

        commentDeleteBtns.forEach(btn => {
            btn.addEventListener("click", (event) => {
                const commentDeleteBtn = event.target;

                const commentId = commentDeleteBtn.getAttribute("data-comment-id");

                const url = `/api/comments/${commentId}`;
                fetch(url, {
                    method : "DELETE"
                }).then(response => {
                    if (!response.ok) {
                        alert("댓글 삭제 실패");
                        return;
                    }
                    const msg = `${commentId}번 댓글을 삭제하였습니다.`;
                    alert(msg);

                    window.location.reload();
                });
            });
        });
    }
</script>