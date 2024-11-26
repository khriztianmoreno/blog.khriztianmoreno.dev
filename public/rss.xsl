<?xml version="1.0" encoding="utf-8"?>
<!--
The stylesheet for the RSS feed.
See:
- https://lepture.com/en/2019/rss-style-with-xsl
- https://github.com/yy4382/yfi.moe/blob/main/app/blog/public/rss-style.xsl
- https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl
-->
<xsl:stylesheet version="3.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
            <head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <title><xsl:value-of select="/rss/channel/title" /> Web Feed </title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <style type="text/css">
                    html {
                    color: #f8f8f2;
                    }
                    a {
                    color:#8be9fd;
                    text-underline-offset: 4px;
                    }
                    a:hover {
                    color:#bd93f9;
                    transition-property: color;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 150ms;
                    }
                    .card {
                    background-color: rgba(68, 71, 90, 0.2);
                    }
                    .card:hover {
                    background-color: rgb(68, 71, 90);
                    transition-property: background-color;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                    transition-duration: 150ms;
                    }
                    .background {
                    background-color: #282a35;
                    }
                </style>
            </head>
            <body class="background">
                <div style="margin: 1rem auto; max-width: 48rem;">
                    <header style="padding-bottom: 1rem;">
                        <h1 style="color: #ee81c3;">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2rem"
                                height="2rem"
                                viewBox="0 0 24 24"
                                style="color: #f4bb78; margin-right: 0.5rem"
                            >
                                <path
                                    fill="currentColor"
                                    d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27zm0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93z"
                                ></path>
                            </svg>

                            <xsl:value-of select="/rss/channel/title" />
                        </h1>
                        <p>
                            <xsl:value-of select="/rss/channel/description" />
                        </p>
                        <a class="head_link">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/rss/channel/link" />
                            </xsl:attribute>
                            <span> Visit Website </span>
                        </a>
                    </header>
                    <div style="padding-bottom: 1rem;">
                        <h2>Notice</h2>
                        <div style="font-size: 0.875rem;">
                            <p>
                                This is a RSS feed, not a webpage.
                            </p>
                            <p>
                                If you are reading this text, it means you are directly opening this
                                address in your browser.
                                Please copy the URL in the address bar of your browser to your RSS
                                reader.
                            </p>
                            <p> If you don't know what a RSS reader is, you can read my friend's
                                article: <a
                                    href="http://yfi.moe/post/all-about-rss/" target="_blank"
                                    rel="nofollow">RSS:
                                    是什么？为什么？怎么用？</a>。 </p>
                        </div>
                    </div>
                    <h2>Recent Items</h2>
                    <xsl:for-each select="/rss/channel/item">
                        <div class="card"
                            style="padding: 0.5rem 1rem 0.5rem; margin: 0.5rem 0rem;">
                            <h3 style="margin: 0rem; font-size: 1rem;">
                                <a>
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="link" />
                                    </xsl:attribute>
                                    <xsl:value-of select="title" />
                                </a>
                            </h3>
                            <small style="font-size: 0.75rem;"> Published: <xsl:value-of
                                    select="pubDate" />
                            </small>
                        </div>
                    </xsl:for-each>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
