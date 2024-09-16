import { Page, Layout, TextContainer } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

export default function AkiTestPage() {
  const { t } = useTranslation();

  return (
    <Page title={t("AkiTestPage.title")}>
      <Layout>
        <Layout.Section>
          <TextContainer>
            <h1>{t("AkiTestPage.title")}</h1>
            <p>{t("AkiTestPage.content")}</p>
          </TextContainer>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
