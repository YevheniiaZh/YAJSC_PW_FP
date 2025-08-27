export class ArrayUtils {
 static getSortedProduct(productSortingParam: string[], sortOrder: 'asc' | 'desc'): string[] {
    const sortedProducts = [...productSortingParam].sort((a, b) => a.localeCompare(b));
    return sortOrder === 'desc' ? sortedProducts.reverse() : sortedProducts;
  }
}

