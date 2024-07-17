function urlToList(url: string) {
    const urlList = url.split('/').filter(i => i)
    return urlList.map((_, index) => {
        return `/${urlList.slice(0, index + 1).join('/')}`;
    })
}

export default urlToList