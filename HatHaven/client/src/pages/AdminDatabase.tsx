import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getProductImage } from "@/lib/imageMap";
import type { Product } from "@shared/schema";

export default function AdminDatabase() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <Card className="mx-auto max-w-7xl border-card-border">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="font-serif text-3xl">Product Database</CardTitle>
          <Badge variant="outline" className="px-3 py-1">
            {products.length} Items Total
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Item Code</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Artisan Cost</TableHead>
                  <TableHead>Shipping</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="h-16 w-16 overflow-hidden rounded-md border border-card-border bg-muted">
                        <img
                          src={getProductImage(product.image)}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                        {product.itemCode || "N/A"}
                      </code>
                    </TableCell>
                    <TableCell>${parseFloat(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      {product.artisanCost ? `$${parseFloat(product.artisanCost).toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>
                      {product.shippingCost ? `$${parseFloat(product.shippingCost).toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.stock > 5 ? "secondary" : "destructive"}>
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
