package com.library.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/getbyid/{id}")
    public Book GetById(@PathVariable long id) {
        return bookRepository.findById(id).get();
    }

    @PostMapping("/update")
    public void Update(@RequestBody Book book) {
        Book bookInDb = bookRepository.findById(book.getId()).get();
        if(bookInDb != null){
            bookInDb.setAuthor(book.getAuthor());
            bookInDb.setName(book.getName());
            if(book.getLibrary() != null){
                bookInDb.setLibrary(book.getLibrary());
            }
            bookRepository.save(bookInDb);
        }
    }

    @DeleteMapping("/deletebyid/{id}")
    public void DeleteById(@PathVariable long id) {
        bookRepository.deleteById(id);
    }

    @PostMapping("/create")
    public void Create(@RequestBody Book book) {
        bookRepository.save(book);
    }
}