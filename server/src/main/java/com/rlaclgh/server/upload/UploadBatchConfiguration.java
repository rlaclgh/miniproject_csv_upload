package com.rlaclgh.server.upload;


import com.rlaclgh.server.entity.Product;
import jakarta.persistence.EntityManagerFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.mapping.FieldSetMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.item.file.transform.FieldSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@Slf4j
@EnableBatchProcessing
public class UploadBatchConfiguration {


  @Autowired
  EntityManagerFactory entityManagerFactory;


  protected static class ProductFieldSetMapper implements FieldSetMapper<Product> {
    public Product mapFieldSet(FieldSet fieldSet) {
      return new Product(fieldSet.readString(0),fieldSet.readString(1), fieldSet.readString(2));
    }
  }

  @Bean
  @StepScope
  public FlatFileItemReader<Product> productItemReader(
      @Value("#{jobParameters[date]}") String date
  ) {

    return new FlatFileItemReaderBuilder<Product>()
        .linesToSkip(1)
        .name("productItemReader")
        .resource(new FileSystemResource("src/main/resources/upload/product_upload_example.csv"))
        .delimited().delimiter(",")
        .names("name", "nameEng", "description")
        .targetType(Product.class)
        .build();
  }
  @Bean
  @StepScope
  public ItemWriter<Product> productItemWriter() {
    JpaItemWriter<Product> jpaItemWriter = new JpaItemWriter<>();
    jpaItemWriter.setEntityManagerFactory(entityManagerFactory);
    return jpaItemWriter;
  }

  @Bean
  public Step productStep(JobRepository jobRepository, PlatformTransactionManager transactionManager
  ) {

    return new StepBuilder("product", jobRepository)
        .<Product, Product>chunk(10, transactionManager)
        .reader(productItemReader(null))
        .writer(productItemWriter())
        .build();
  }

  @Bean
  public Job productJob(JobRepository jobRepository, PlatformTransactionManager transactionManager){
    return new JobBuilder("product", jobRepository)
        .start(productStep(jobRepository, transactionManager))
        .build();
  }






}
