package com.rlaclgh.server.upload;


import com.rlaclgh.server.entity.Product;
import com.rlaclgh.server.repository.ProductRepository;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/upload")
@Slf4j
public class UploadController {


  @Autowired
  private JobLauncher jobLauncher;

  @Autowired
  private Job job;

  @Autowired
  private ProductRepository productRepository;


  @Value("${upload.dir}")
  private String uploadDir;

  @PostMapping()
  public void upload(@RequestParam MultipartFile file)
      throws IOException, JobInstanceAlreadyCompleteException, JobExecutionAlreadyRunningException, JobParametersInvalidException, JobRestartException {



    if (!file.isEmpty()) {
      String filename = file.getOriginalFilename();

      assert filename != null;
      String fullPath = uploadDir + filename;

      file.transferTo(new File(fullPath));


      JobParameters jobParameters = new JobParametersBuilder()
          .addString("filename", filename)
          .addDate("date", new Date())
          .toJobParameters();

      jobLauncher.run(job, jobParameters);


    }

  }

}
