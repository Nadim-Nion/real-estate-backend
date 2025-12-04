import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getPagination } from 'src/utils/pagination';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(payload: CreateCategoryDto, user: any) {
    try {
      // Find the user in the db
      const isUserExists = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      console.log(
        '🚀 ~ CategoryService ~ createCategory ~ isUserExists:',
        isUserExists,
      );

      // Check if the user is authorized to create a category
      if (!isUserExists || isUserExists.type !== 'admin') {
        throw new ConflictException(
          'You are not authorized to create a category',
        );
      }

      // Check if the category with the same name and slug already exists
      const existingcategory = await this.prisma.category.findFirst({
        where: {
          OR: [{ name: payload.name }, { slug: payload.slug }],
        },
      });

      if (existingcategory) {
        throw new ConflictException(
          'Category with the same name or slug already exists',
        );
      }

      const result = await this.prisma.category.create({
        data: payload,
      });

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Category created successfully',
        data: result,
      };
    } catch (error) {
      console.log('error in category,service ln-50:', error);
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || 'Failed to create category',
      };
    }
  }

  async findAll(page: number, limit: number) {
    try {
      // // Implement pagination
      // const result = await this.prisma.category.findMany({
      //   skip: (page - 1) * limit,
      //   take: limit,
      // });

      // // Count the records in the table
      // const totalCount = await this.prisma.category.count();

      // // Count Total pages
      // const totalPages = Math.ceil(totalCount / limit);

      // Using utility function for pagination
      const { result, totalCount, totalPages } = await getPagination(
        this.prisma.category,
        page,
        limit,
      );

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'All Categories retrieved successfully',
        metaData: {
          totalCount,
          totalPages,
          currentPage: page,
          limit,
        },
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message || 'Failed to create category',
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
