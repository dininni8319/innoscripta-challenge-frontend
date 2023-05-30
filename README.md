<h1>Project Title: News Aggregator</h1>

<h3>Packages --- Dependencies</h3>
pnpm install --save styled-components<br />
pnpm install --save react-router-dom<br />
pnpm i polished<br />
pnpm install react-transition-group --save<br />
<h3>Packages --- devDependencies</h3>
Docker<br/>
docker build -t [any name] . <br/>
image name: frontend:1
docker exec -it 79b3fa70b51d /bin/sh
priettier<br />

<!-- const tag = 'politics'
  // useEffect(() => {
  //   const fetchGuardianNews = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${guardianNewUrl}${inputState.value}&tag=${tag}/${tag}&from-date=2023-04-01&api-key=${guardianApiKey}`
  //       )


  //       setSearchedArticles((prevState) =>
  //         responseData.articles?.concat(prevState)
  //       )
  //     } catch (error) {}
  //   }
  //   fetchGuardianNews()
  // }, [inputState.value]) -->
<!-- 
 let filteredSource = articles?.filter(
          (article) => article.source.name === preference.source
        )
        let filteredAuthor = filteredSource?.filter(
          (article) => article.author === preference.author
        )
        setSearchedArticles(filteredAuthor) -->