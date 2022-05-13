import Head from 'next/head'

function MyHead({ title }:{ title: string }) {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    )
}


MyHead.defaultProps = {
    title: 'blog NestNext'
}

export default MyHead