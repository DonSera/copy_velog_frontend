import Header from "../components/header/Header";

function MakeVelogPost() {
    return <section className={'make-post'}>
        <Header/>
        <div className={'Body'}>
            <div>타이틀</div>
            <div>서브 타이틀</div>
            <div>컨텐트</div>
        </div>
    </section>
}

export default MakeVelogPost;