const convertArticleStrToObject = (articlesData: IArticle[]) => articlesData?.map((article) => ({
  ...article,
  content: typeof (article.content) === 'string' ? JSON.parse(article.content) : '',
}));

export default convertArticleStrToObject;
