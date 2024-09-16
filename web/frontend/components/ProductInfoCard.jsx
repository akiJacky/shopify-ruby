import { useState } from "react";
import { Card, TextField, Button, TextContainer, Text } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export function ProductInfoCard() {
  const shopify = useAppBridge();
  const { t } = useTranslation();
  const [productId, setProductId] = useState(""); // 入力されたプロダクトID
  const [productData, setProductData] = useState(null); // プロダクトデータ
  const [loading, setLoading] = useState(false); // ロード中かどうかのフラグ
  const [error, setError] = useState(null); // エラーメッセージ

  // プロダクトIDに基づいてプロダクト情報を取得する関数
  const fetchProductData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProductData(data); // 取得したデータをステートに保存
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={t("ProductInfoCard.title")} sectioned>
      <TextContainer spacing="loose">
        {/* プロダクトIDの入力フィールド */}
        <TextField
          label={t("ProductInfoCard.productIdLabel")}
          value={productId}
          onChange={(value) => setProductId(value)}
          placeholder={t("ProductInfoCard.productIdPlaceholder")}
        />

        {/* プロダクト情報を取得するボタン */}
        <Button onClick={fetchProductData} loading={loading} disabled={!productId}>
          {t("ProductInfoCard.fetchProductButton")}
        </Button>

        {/* エラーメッセージの表示 */}
        {error && <Text color="critical">{error}</Text>}

        {/* プロダクト情報の表示 */}
        {productData && (
          <div>
            <Text variant="headingMd" as="h4">
              {t("ProductInfoCard.productInfoTitle")}
            </Text>
            <Text as="p">ID: {productData.id}</Text>
            <Text as="p">Title: {productData.title}</Text>
            <Text as="p">Price: {productData.price}</Text>
            {/* 必要に応じて他のプロダクト情報も追加 */}
          </div>
        )}
      </TextContainer>
    </Card>
  );
}
