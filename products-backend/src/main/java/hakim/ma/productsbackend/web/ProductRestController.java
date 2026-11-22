package hakim.ma.productsbackend.web;

import hakim.ma.productsbackend.entities.Product;
import hakim.ma.productsbackend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductRestController {
    private final ProductRepository productRepository;

    public ProductRestController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/products")
    public List<Product> products() {
        return productRepository.findAll();
    }

    @GetMapping("/products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @PostMapping("/products")
    public Product saveProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PatchMapping("/products/{id}")
    public Product updateSelected(@PathVariable Long id, @RequestBody Product product) {
        Product p = productRepository.findById(id).orElseThrow();
        p.setSelected(product.isSelected());
        return productRepository.save(p);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
