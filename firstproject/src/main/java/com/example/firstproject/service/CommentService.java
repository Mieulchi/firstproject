package com.example.firstproject.service;

import com.example.firstproject.dto.CommentDto;
import com.example.firstproject.entity.Article;
import com.example.firstproject.entity.Comment;
import com.example.firstproject.repository.ArticleRepository;
import com.example.firstproject.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public List<CommentDto> comments(Long articleId) {
        return commentRepository.findByArticleId(articleId)
                .stream()
                .map(comment -> CommentDto.createCommentDto(comment))
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentDto create(Long articleId, CommentDto dto) {
        //1 게시글조회/예외
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("댓글 생성 실패! 대상 게시글이 없습니다."));

        //2 댓글 엔티티생성
        Comment comment = Comment.createComment(dto, article);

        //3 엔티티 db에 저장
        Comment created = commentRepository.save(comment);

        //4 엔티티 dto로 바꾸어 리턴
        return CommentDto.createCommentDto(created);
    }

    @Transactional
    public CommentDto update(Long id, CommentDto dto) {
        //댓글조회, 예외처리
        Comment target = commentRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("댓글 수정 실패! 대상 댓글이 없읍니다."));

        //댓글수정
        target.patch(dto);

        //db갱신
        Comment updated = commentRepository.save(target);

        //엔티티 dto로 변환 반환
        return CommentDto.createCommentDto(updated);
    }

    @Transactional
    public CommentDto delete(Long id) {
        //댓글 조회, 예외처리
        Comment target = commentRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("삭제실패대상댓글업슴"));

        //삭제
        commentRepository.delete(target);

        //삭제댓글 dto로 반환
        return CommentDto.createCommentDto(target);
    }
}
