import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Body() {
	const [articles, setArticles] = useState([]);

    useEffect(() => {
        console.log("Fetching articles...");
        fetch("api/articles")
        .then(response => response.json())
        .then(data => {
            setArticles(data);
            console.log("Articles fetched:", data);
        })
    }, []);

    console.log("Current articles:", articles);

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
					  {articles.map(article => (
						<tr key={article.id}>
                            <td>{article.id}</td>
                            <td><Link to={`/${article.id}`} state = {{ article : article}}>
                                {article.title}
							</Link></td>
                            <td>{article.content}</td>
                        </tr>
						))}
                </tbody>
			</table>
			<Link to="/articles/new">New Article</Link>
		</>
	);
}

export default Body;