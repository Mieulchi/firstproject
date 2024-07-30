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
		//fetch("api/articles/{id}.comments");
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

			    </tbody>
			</table>
		</>
	);
}

export default Show;