<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" />
    
    <xsl:template match="/">
       <ul>
           <xsl:apply-templates select="*" />
       </ul>
    </xsl:template>

    <xsl:template match="employee">
        <li><xsl:value-of select="name" />, <em><xsl:value-of select="@title" /></em></li>
    </xsl:template>

</xsl:stylesheet>
