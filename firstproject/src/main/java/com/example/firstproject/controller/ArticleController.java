package com.example.firstproject.controller;

import com.example.firstproject.dto.ArticleForm;
import com.example.firstproject.dto.CommentDto;
import com.example.firstproject.entity.Article;
import com.example.firstproject.entity.Comment;
import com.example.firstproject.repository.ArticleRepository;
import com.example.firstproject.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
public class ArticleController {
    private static final Logger log = LoggerFactory.getLogger(ArticleController.class);
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CommentService commentService;

    @GetMapping("/articles/new")
    public String newArticleForm() {
        return "articles/new";
    }


    @GetMapping("/articles/{id}")
    public String show(@PathVariable long id, Model model) {
        log.info("id = " + id);

        //id 조회, 데이터 가져오기
        Article articleEntity = articleRepository.findById(id).orElse(null);
        List<CommentDto> commentDtos = commentService.comments(id);

        //모델에 등록
        model.addAttribute("article", articleEntity);
        model.addAttribute("commentDtos", commentDtos);

        //뷰 반환
        return "articles/show";
    }

    @GetMapping("/articles/{id}/edit")
    public String edit(@PathVariable Long id, Model model) {
        Article articleEntity = articleRepository.findById(id).orElse(null);

        model.addAttribute("article", articleEntity);

        return "articles/edit";
    }

    @GetMapping("/articles")
    public String index(Model model) {
        //1. bring all datas
        ArrayList<Article> articleEntitylists = articleRepository.findAll();

        //2. register data on model
        model.addAttribute("articleList", articleEntitylists);

        return "articles/index";
    }

    @PostMapping("/articles/create")
    public String createArticle(ArticleForm form) {
        //System.out.println(form.toString());
        log.info(form.toString());

        //dto를 엔티티로 변환
        Article article = form.toEntity();
        //System.out.println(article.toString());
        log.info(article.toString());

        //repo로 entity를 db에 저장
        Article saved = articleRepository.save(article);
        //System.out.println(saved.toString());
        log.info(saved.toString());

        return "redirect:/articles/" + saved.getId();
    }

    @PostMapping("/articles/update")
    public String update(ArticleForm form) {
        log.info(form.toString());

        Article articleEntity = form.toEntity();

        Article target = articleRepository.findById(articleEntity.getId()).orElse(null);

        if (target != null) {
            articleRepository.save(articleEntity);
        }

        return "redirect:/articles/" + target.getId();
    }

    @GetMapping("/articles/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes rttr) {
        log.info("delete request coming!");

        //1. bring delete target
        Article target = articleRepository.findById(id).orElse(null);

        //2. remove target entity
        if (target != null) {
            log.info(target.toString());
            articleRepository.delete(target);
            rttr.addFlashAttribute("msg", "삭제되었습니다!");
            return "redirect:/articles";
        }
        else {
            rttr.addFlashAttribute("msg", "오류가 발생했습니다.");
            return "redirect:/articles/error";
        }

        //3. redirect to result page

        //return "redirect:/articles";
    }
    @GetMapping("/articles/error")
    public String error() {
            return "articles/error";
    }
}
