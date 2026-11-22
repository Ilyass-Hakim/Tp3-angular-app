package hakim.ma.productsbackend;

import hakim.ma.productsbackend.entities.Product;
import hakim.ma.productsbackend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ProductsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductsBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder()
                    .name("Ordinateur Portable").price(1300).selected(true).build());
            productRepository.save(Product.builder()
                    .name("Imprimante Multifonction").price(300).selected(false).build());
            productRepository.save(Product.builder()
                    .name("Smartphone 5G").price(800).selected(true).build());
            productRepository.findAll().forEach(p -> System.out.println(p.getName()));
        };
    }

}
