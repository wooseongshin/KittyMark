import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoardDto';
import { UpdateBoardDto } from './dto/updateBoaedDto';
import { ResponseInterceptor } from '../interceptor/responseInterceptor';
import { DeleteBoardDto } from 'board/dto/deleteBoardDto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('board')
@UseInterceptors(ResponseInterceptor)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('/')
  @UseInterceptors(FilesInterceptor('images'))
  @UsePipes(ValidationPipe)
  createBoard(
    @UploadedFiles() images: Express.Multer.File[],
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.createBoard(createBoardDto, images);
  }

  @Patch('/')
  @UsePipes(ValidationPipe)
  updateBoard(@Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.updateBoard(updateBoardDto);
  }

  @Delete('/')
  @UsePipes(ValidationPipe)
  deleteBoard(@Body() deleteBoardDto: DeleteBoardDto) {
    return this.boardService.deleteBoard(deleteBoardDto);
  }

  @Get('/')
  getBoardList(
    @Query('count', ParseIntPipe) count: number,
    @Query('max_id', ParseIntPipe) maxId: number,
  ) {
    return this.boardService.getLastBoardList(count, maxId);
  }

  // @Get('/:boardId/comment')
  // searchComment(
  //   @Param('boardId', ParseIntPipe) boardId: number,
  //   @Query('count', ParseIntPipe) count: number,
  // ) {}
  //
  // @Get('/:boardId/like')
  // searchLikePeople() {}
  //
  // @Post('/like')
  // boardLike() {}
  //
  // @Delete('/like')
  // boardLikeDelete() {}
}
