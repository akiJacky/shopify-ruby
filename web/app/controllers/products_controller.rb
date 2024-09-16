# frozen_string_literal: true

class ProductsController < AuthenticatedController
  # GET /api/products/:id
  def show
    begin
      product_id = params[:id]      
      product = ShopifyAPI::Product.find(id: product_id)

      if product
        render(json: product)
      else
        render(json: { error: "Product not found #{product_id}" }, status: :not_found)
      end
    rescue StandardError => e
      ShopifyAPI::Logger.error("Failed to retrieve product: #{e.message}")
      render(json: { error: "Failed to retrieve product: #{e.message}" }, status: :internal_server_error)
    end
  end

  # GET /api/products/count
  def count
    product_count = ShopifyAPI::Product.count.body
    ShopifyAPI::Logger.info("Retrieved product count: #{product_count["count"]}")
    render(json: product_count)
  end

  # POST /api/products
  def create
    ProductCreator.call(count: 5, session: current_shopify_session, id_token: shopify_id_token)
    render(json: { success: true, error: nil })
  rescue StandardError => e
    logger.error("Failed to create products: #{e.message}")
    render(json: { success: false, error: e.message }, status: e.try(:code) || :internal_server_error)
  end
end
