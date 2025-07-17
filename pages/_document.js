import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <title>LazyContent - Duck Cloud</title>
        <meta name="title" content="LazyContent - Duck Cloud" />
        <meta name="description" content="Generate social media content from blog posts and speech using AI with integration to Notion database." />
        <meta name="keywords" content="AI content generation, social media content, blog post to social media, speech to text, Notion integration" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lazycontent.duckcloud.io/" />
        <meta property="og:title" content="LazyContent - Duck Cloud" />
        <meta property="og:description" content="Generate social media content from blog posts and speech using AI with integration to Notion database." />
        <meta property="og:image" content="https://lazycontent.duckcloud.io/og-image.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://lazycontent.duckcloud.io/" />
        <meta property="twitter:title" content="LazyContent - Duck Cloud" />
        <meta property="twitter:description" content="Generate social media content from blog posts and speech using AI with integration to Notion database." />
        <meta property="twitter:image" content="https://lazycontent.duckcloud.io/og-image.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="Duck Cloud" />
        <meta name="publisher" content="Duck Cloud" />
        <meta name="application-name" content="LazyContent" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
