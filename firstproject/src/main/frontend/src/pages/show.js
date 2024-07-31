import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Show() {
	const [article, setArticle] = useState("");
	const [comments, setComments] = useState([]);

	const params = useParams();

	useEffect(() => {
		const id = params.id;
        console.log("log for params" + id);
	    fetch(`/api/articles/${id}`)
        .then(response => response.json())
        .then(data => {
            setArticle(data);
            console.log(data);
		})
		fetch(`api/articles/${id}/comments`)
		.then(response => response.json())
		.then(data => {
			setComments(data);
			console.log(data);
		});
	}, []);

	console.log(article);

	return (
		<>
			<table className="table">
			    <thead>
			    <tr>
			        <th scope="col">Id</th>
			        <th scope="col">Title</th>
			        <th scope="col">Content</th>
			    </tr>
			    </thead>
			    <tbody>
					<tr key = {article.id}>
		                <td>{article.id}</td>
		                    <td>
		                        {article.title}
							</td>
		                <td>{article.content}</td>
					</tr>

					 {comments.map(comment => (
                            <div className="card m-2" id="comments-{comment.id}">
                                    <div className ="card-header">
                                        {comment.nickname}
                                        <button type="button"
                                                className="btn btn-sm btn-outline-primary"
                                                data-bs-toggle="modal"
                                                data-bs-target="#comment-edit-modal"
                                                data-bs-id="{comment.id}"
                                                data-bs-nickname="{comment.nickname}"
                                                data-bs-body="{comment.body}"
                                                data-bs-article-id="{comment.articleId}">
                                            수정
                                        </button>
                                        <button type="button" className="btn btn-sm btn-outline-danger comment-delete-btn"
                                            data-comment-id="{comment.id}">삭제</button>
                                    </div>
                                    <div class="card-body">
                                        {comment.body}
                                    </div>
                            </div>
                     ))}

			    </tbody>
			</table>
		</>
	);
}

export default Show;